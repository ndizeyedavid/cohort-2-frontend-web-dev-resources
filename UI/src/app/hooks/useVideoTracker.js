import { useCallback, useEffect, useRef, useState } from "react";
import { createVideoTracker } from "../../services/tracking.js";
import { itemState, keys } from "../../services/progress.js";
import { XP_REWARDS } from "../../services/gamification.js";
import { useVault } from "../providers/VaultProvider.jsx";

export function useVideoTracker(videoId) {
  const { state, completeItem } = useVault();
  const [progress, setProgress] = useState(0);
  const key = keys.video(videoId);
  const completed = itemState(state, key) === "completed";
  const trackerRef = useRef(null);
  const completeRef = useRef(completeItem);

  useEffect(() => {
    completeRef.current = completeItem;
  }, [completeItem]);

  useEffect(() => {
    const tracker = createVideoTracker({
      onProgress: setProgress,
      onComplete: () => completeRef.current(key, XP_REWARDS.video),
    });
    trackerRef.current = tracker;
    return () => {
      tracker.detach();
      trackerRef.current = null;
    };
  }, [key]);

  const onPlayer = useCallback((player) => {
    if (trackerRef.current) trackerRef.current.attach(player);
  }, []);

  return { progress, completed, onPlayer };
}
