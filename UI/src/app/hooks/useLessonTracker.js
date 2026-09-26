import { useEffect, useRef, useState } from "react";
import { createLessonTracker } from "../../services/tracking.js";
import { itemState, keys } from "../../services/progress.js";
import { XP_REWARDS } from "../../services/gamification.js";
import { useVault } from "../providers/VaultProvider.jsx";

export function useLessonTracker({ moduleId, lessonId, minutes, articleRef }) {
  const { state, completeItem } = useVault();
  const [progress, setProgress] = useState(0);
  const key = keys.lesson(moduleId, lessonId);
  const completed = itemState(state, key) === "completed";
  const completeRef = useRef(completeItem);

  useEffect(() => {
    completeRef.current = completeItem;
  }, [completeItem]);

  useEffect(() => {
    if (completed || !articleRef.current) return undefined;
    const stop = createLessonTracker({
      element: articleRef.current,
      minutes,
      onProgress: setProgress,
      onComplete: () => completeRef.current(key, XP_REWARDS.lesson),
    });
    return stop;
  }, [completed, minutes, key, articleRef]);

  return { progress, completed };
}
