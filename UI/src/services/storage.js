const KEY = "cohort-vault:v1";

export function freshState() {
  return {
    progress: { items: {}, quizAttempts: {} },
    activity: [],
    gamification: { xp: 0, level: 1, streak: 0, badges: [] },
    generatedQuizzes: [],
    settings: { voice: false, theme: "light" },
    tutorHistory: [],
  };
}

function merge(saved, base) {
  return {
    ...base,
    ...saved,
    progress: { ...base.progress, ...(saved.progress || {}) },
    gamification: { ...base.gamification, ...(saved.gamification || {}) },
    settings: { ...base.settings, ...(saved.settings || {}) },
  };
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { state: freshState(), degraded: false };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("unreadable state");
    return { state: merge(parsed, freshState()), degraded: false };
  } catch {
    return { state: freshState(), degraded: true };
  }
}

let timer = null;

export function scheduleSave(state) {
  clearTimeout(timer);
  timer = setTimeout(() => saveNow(state), 300);
}

export function saveNow(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearAll() {
  try {
    window.localStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}
