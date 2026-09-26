import { LEVELS } from "./badges.js";
import { currentStreak, touchActivity } from "./progress.js";
import { todayKey } from "../lib/format.js";

export const XP_REWARDS = {
  lesson: 10,
  quizBase: 5,
  quizPerPointAbove70: 2,
  link: 3,
  video: 5,
  dailyGoal: 15,
};

export const DAILY_GOAL_EVENTS = 3;

export function levelFor(xp) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.xp) current = level;
  }
  const next = LEVELS.find((level) => level.xp > xp) || null;
  const span = next ? next.xp - current.xp : 1;
  const into = next ? xp - current.xp : 1;
  return { ...current, next, progress: Math.min(1, into / span) };
}

export function quizXp(percentScore) {
  const above = Math.max(0, percentScore - 70);
  return XP_REWARDS.quizBase + above * XP_REWARDS.quizPerPointAbove70;
}

function goalDoneToday(state) {
  return state.activity.some(
    (day) => day.date === todayKey() && day.goalAwarded,
  );
}

export function applyRewards(prev, next) {
  const streak = currentStreak(next.activity);
  const goalEvents = next.activity.find((day) => day.date === todayKey())?.events || 0;
  const goalAlreadyAwarded = goalDoneToday(prev);

  let xpDelta = (next.gamification.xp - prev.gamification.xp) || 0;

  if (!goalAlreadyAwarded && goalEvents >= DAILY_GOAL_EVENTS) {
    xpDelta += XP_REWARDS.dailyGoal;
    next = {
      ...next,
      activity: next.activity.map((day) =>
        day.date === todayKey() ? { ...day, goalAwarded: true } : day,
      ),
    };
  }

  const xp = Math.max(0, prev.gamification.xp + xpDelta);
  const beforeLevel = levelFor(prev.gamification.xp).level;
  const afterLevel = levelFor(xp).level;

  return {
    state: {
      ...next,
      gamification: {
        ...next.gamification,
        xp,
        streak,
        level: afterLevel,
        badges: next.gamification.badges,
      },
    },
    leveledUp: afterLevel > beforeLevel ? afterLevel : null,
    level: levelFor(xp),
  };
}

export function addXp(state, amount) {
  return {
    ...state,
    gamification: { ...state.gamification, xp: state.gamification.xp + amount },
  };
}

export function activityTouch(state) {
  return touchActivity(state);
}
