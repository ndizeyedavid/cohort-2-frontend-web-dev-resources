import { percent, todayKey, yesterdayKey } from "../lib/format.js";
import { relatedTo } from "./catalog.js";

export const keys = {
  lesson: (moduleId, lessonId) => `lesson:${moduleId}/${lessonId}`,
  quiz: (id) => `quiz:${id}`,
  link: (id) => `link:${id}`,
  video: (id) => `video:${id}`,
};

export function itemState(state, key) {
  return state.progress.items[key]?.state || "pending";
}

export function setItemState(state, key, status) {
  const items = { ...state.progress.items };
  if (status === "pending") {
    delete items[key];
  } else {
    items[key] = { state: status, at: new Date().toISOString() };
  }
  return { ...state, progress: { ...state.progress, items } };
}

export function recordQuizAttempt(state, quizId, score, total) {
  const attempts = state.progress.quizAttempts[quizId] || {
    best: 0,
    count: 0,
    attempts: [],
  };
  const entry = { score, total, at: new Date().toISOString() };
  return {
    ...state,
    progress: {
      ...state.progress,
      quizAttempts: {
        ...state.progress.quizAttempts,
        [quizId]: {
          best: Math.max(attempts.best, total ? Math.round((score / total) * 100) : 0),
          count: attempts.count + 1,
          attempts: [...attempts.attempts, entry].slice(-10),
        },
      },
    },
  };
}

export function touchActivity(state) {
  const key = todayKey();
  const existing = state.activity.find((day) => day.date === key);
  const activity = existing
    ? state.activity.map((day) =>
        day.date === key ? { ...day, events: day.events + 1 } : day,
      )
    : [...state.activity, { date: key, events: 1 }];
  return { ...state, activity: activity.slice(-90) };
}

export function currentStreak(activity) {
  if (!activity.length) return 0;
  const days = new Set(activity.map((day) => day.date));
  let cursor = days.has(todayKey()) ? todayKey() : null;
  if (!cursor) {
    if (!days.has(yesterdayKey())) return 0;
    cursor = yesterdayKey();
  }
  let streak = 0;
  let tick = cursor;
  while (days.has(tick)) {
    streak += 1;
    tick = new Date(`${tick}T00:00:00`).getTime() - 86400000;
    tick = todayKey(new Date(tick));
  }
  return streak;
}

export function moduleStats(module, state) {
  if (!module) return { total: 0, done: 0, percent: 0 };
  const lessons = module.lessons || [];
  const doneLessons = lessons.filter(
    (lesson) => itemState(state, keys.lesson(module.id, lesson.id)) === "completed",
  ).length;

  const links = relatedTo(module.id).linkIds;
  const videos = relatedTo(module.id).videoIds;
  const quizzes = relatedTo(module.id).quizIds;

  const doneLinks = links.filter(
    (id) => itemState(state, keys.link(id)) === "completed",
  ).length;
  const doneVideos = videos.filter(
    (id) => itemState(state, keys.video(id)) === "completed",
  ).length;
  const doneQuizzes = quizzes.filter(
    (id) => (state.progress.quizAttempts[id]?.count || 0) > 0,
  ).length;

  const total = lessons.length + links.length + videos.length + quizzes.length;
  const done = doneLessons + doneLinks + doneVideos + doneQuizzes;

  return { total, done, percent: percent(done, total) };
}
