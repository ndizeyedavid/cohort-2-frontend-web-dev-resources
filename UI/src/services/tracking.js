import { clamp } from "../lib/format.js";

export function createLessonTracker({ element, minutes, onProgress, onComplete }) {
  const startedAt = Date.now();
  const requiredDwell = Math.min((minutes || 5) * 4000, 60000);
  let deepest = 0;
  let finished = false;
  let frame = null;

  function measure() {
    frame = null;
    const rect = element.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const depth = clamp(
      (window.scrollY + window.innerHeight - articleTop) / element.offsetHeight,
      0,
      1,
    );
    deepest = Math.max(deepest, depth);
    onProgress?.(deepest);

    const dwelled = Date.now() - startedAt >= requiredDwell;
    if (!finished && deepest >= 0.9 && dwelled) {
      finished = true;
      onComplete?.();
    }
  }

  function onScroll() {
    if (frame) return;
    frame = requestAnimationFrame(measure);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  measure();

  return function stop() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

export function createVideoTracker({ onProgress, onComplete, minPercent = 0.8 }) {
  let timer = null;
  let watched = 0;
  let peak = 0;
  let lastTime = 0;
  let finished = false;
  let player = null;

  function tick() {
    if (!player || typeof player.getCurrentTime !== "function") return;
    try {
      const duration = player.getDuration() || 0;
      const current = player.getCurrentTime() || 0;
      const state = player.getPlayerState?.();

      if (state === 1 && current >= lastTime) {
        watched += Math.min(current - lastTime, 2);
      }
      lastTime = current;

      if (duration > 0) {
        peak = Math.max(peak, current / duration);
        onProgress?.(Math.min(peak / minPercent, 1));
        const needed = Math.min(30, duration * 0.9);
        if (!finished && peak >= minPercent && watched >= needed) {
          finished = true;
          clearInterval(timer);
          timer = null;
          onComplete?.();
        }
      }
    } catch {
      clearInterval(timer);
      timer = null;
    }
  }

  return {
    attach(youtubePlayer) {
      player = youtubePlayer;
      lastTime = 0;
      if (!timer) timer = setInterval(tick, 1000);
    },
    detach() {
      if (timer) clearInterval(timer);
      timer = null;
      player = null;
    },
  };
}
