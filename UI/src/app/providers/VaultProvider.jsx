import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { loadState, saveNow, scheduleSave } from "../../services/storage.js";
import {
  recordQuizAttempt,
  setItemState,
  touchActivity,
} from "../../services/progress.js";
import { addXp, applyRewards, XP_REWARDS, quizXp } from "../../services/gamification.js";
import { ALL_BADGES, evaluateBadges } from "../../services/badges.js";

const VaultContext = createContext(null);

const boot = loadState();

export function VaultProvider({ children }) {
  const stateRef = useRef(boot.state);
  const [state, setState] = useState(boot.state);
  const [degraded, setDegraded] = useState(boot.degraded);

  const update = useCallback((mutator, xpFor = null) => {
    const prev = stateRef.current;
    let next = mutator(prev) || prev;

    if (xpFor) {
      const amount = xpFor(prev);
      if (amount > 0) next = addXp(next, amount);
    }

    next = touchActivity(next);
    const rewarded = applyRewards(prev, next);
    next = rewarded.state;

    const { unlocked } = evaluateBadges(next, next.gamification.streak);
    if (unlocked.length) {
      next = {
        ...next,
        gamification: {
          ...next.gamification,
          badges: [...next.gamification.badges, ...unlocked],
        },
      };
      for (const id of unlocked) {
        const badge = ALL_BADGES.find((item) => item.id === id);
        if (badge) toast.success(`Badge unlocked: ${badge.name}`);
      }
    }

    if (rewarded.leveledUp) {
      toast(`Level ${rewarded.leveledUp}: ${rewarded.level.name}`, { icon: "🎉" });
    }

    stateRef.current = next;
    setState(next);
    scheduleSave(next);

    if (degraded && saveNow(next)) setDegraded(false);
  }, [degraded]);

  const value = useMemo(() => {
    const alreadyDone = (prev, key) => prev.progress.items[key]?.state === "completed";

    return {
      state,
      degraded,
      update,
      setItem: (key, status) => update((s) => setItemState(s, key, status)),
      completeItem: (key, xp = 0) =>
        update(
          (s) => setItemState(s, key, "completed"),
          (prev) => (alreadyDone(prev, key) ? 0 : xp),
        ),
      revertItem: (key) => update((s) => setItemState(s, key, "pending")),
      openItem: (key) =>
        update((s) =>
          s.progress.items[key] ? s : setItemState(s, key, "opened"),
        ),
      submitQuiz: (quizId, score, total) =>
        update(
          (s) => recordQuizAttempt(s, quizId, score, total),
          () => quizXp(total ? Math.round((score / total) * 100) : 0),
        ),
      setSetting: (patch) =>
        update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      pushTutorMessage: (message) =>
        update((s) => ({
          ...s,
          tutorHistory: [...s.tutorHistory, message].slice(-40),
        })),
      clearTutor: () => update((s) => ({ ...s, tutorHistory: [] })),
      saveGeneratedQuiz: (quiz) =>
        update((s) => ({
          ...s,
          generatedQuizzes: [
            ...s.generatedQuizzes.filter((item) => item.id !== quiz.id),
            quiz,
          ],
        })),
      deleteGeneratedQuiz: (quizId) =>
        update((s) => ({
          ...s,
          generatedQuizzes: s.generatedQuizzes.filter((item) => item.id !== quizId),
        })),
      XP_REWARDS,
    };
  }, [state, degraded, update]);

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) throw new Error("useVault must be used inside VaultProvider");
  return context;
}
