import badgeData from "../data/badges.json";
import { modules, relatedTo } from "./catalog.js";
import { itemState, keys, moduleStats } from "./progress.js";

export const { badges: ALL_BADGES, levels: LEVELS } = badgeData;

function lessonsCompleted(state) {
  let total = 0;
  for (const module of modules) {
    for (const lesson of module.lessons || []) {
      if (itemState(state, keys.lesson(module.id, lesson.id)) === "completed") {
        total += 1;
      }
    }
  }
  return total;
}

function quizzesPassed(state) {
  return Object.values(state.progress.quizAttempts).filter(
    (attempt) => attempt.best >= 70,
  ).length;
}

function moduleDone(state, moduleId) {
  const module = modules.find((item) => item.id === moduleId);
  if (!module) return false;
  return moduleStats(module, state).percent === 100;
}

function satisfies(rule, state, streak) {
  switch (rule.type) {
    case "lessonsCompleted":
      return lessonsCompleted(state) >= rule.target;
    case "quizzesPassed":
      return quizzesPassed(state) >= rule.target;
    case "streakDays":
      return streak >= rule.target;
    case "moduleCompleted":
      return moduleDone(state, rule.target);
    default:
      return false;
  }
}

export function evaluateBadges(state, streak) {
  const owned = new Set(state.gamification.badges);
  const unlocked = ALL_BADGES.filter(
    (badge) => !owned.has(badge.id) && satisfies(badge.rule, state, streak),
  ).map((badge) => badge.id);
  return { unlocked, all: ALL_BADGES };
}

export function relatedCounts(moduleId) {
  const related = relatedTo(moduleId);
  return related;
}
