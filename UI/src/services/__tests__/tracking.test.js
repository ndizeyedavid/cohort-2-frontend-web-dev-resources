import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createVideoTracker } from "../tracking.js";

function makePlayer() {
  return {
    time: 0,
    duration: 100,
    state: 1,
    getCurrentTime() {
      return this.time;
    },
    getDuration() {
      return this.duration;
    },
    getPlayerState() {
      return this.state;
    },
  };
}

function tickTimes(player, from, to, step = 1) {
  for (let time = from; time <= to; time += step) {
    player.time = time;
    vi.advanceTimersByTime(1000);
  }
}

describe("createVideoTracker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("completes after watching at least 80 percent with enough watch time", () => {
    const onComplete = vi.fn();
    const tracker = createVideoTracker({ onComplete });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 1, 85);
    expect(onComplete).toHaveBeenCalledTimes(1);
    tracker.detach();
  });

  it("does not complete from a single scrub to 85 percent", () => {
    const onComplete = vi.fn();
    const onProgress = vi.fn();
    const tracker = createVideoTracker({ onProgress, onComplete });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 85, 85);
    expect(onComplete).not.toHaveBeenCalled();
    expect(onProgress).toHaveBeenLastCalledWith(1);
    tracker.detach();
  });

  it("completes after sustained watching follows the scrub", () => {
    const onComplete = vi.fn();
    const tracker = createVideoTracker({ onComplete });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 85, 85);
    expect(onComplete).not.toHaveBeenCalled();
    tickTimes(player, 86, 130);
    expect(onComplete).toHaveBeenCalledTimes(1);
    tracker.detach();
  });

  it("ignores time while the player is paused", () => {
    const onComplete = vi.fn();
    const tracker = createVideoTracker({ onComplete });
    const player = makePlayer();
    player.state = 0;
    tracker.attach(player);
    tickTimes(player, 1, 100);
    expect(onComplete).not.toHaveBeenCalled();
    tracker.detach();
  });

  it("keeps reported progress within one", () => {
    const onProgress = vi.fn();
    const tracker = createVideoTracker({ onProgress });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 100, 100);
    expect(onProgress).toHaveBeenLastCalledWith(1);
    tracker.detach();
  });

  it("does not complete below a custom threshold", () => {
    const onComplete = vi.fn();
    const tracker = createVideoTracker({ onComplete, minPercent: 0.95 });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 1, 90);
    expect(onComplete).not.toHaveBeenCalled();
    tickTimes(player, 91, 96);
    expect(onComplete).toHaveBeenCalledTimes(1);
    tracker.detach();
  });

  it("stops ticking after detach", () => {
    const onProgress = vi.fn();
    const tracker = createVideoTracker({ onProgress });
    const player = makePlayer();
    tracker.attach(player);
    tickTimes(player, 1, 10);
    const callsBefore = onProgress.mock.calls.length;
    tracker.detach();
    tickTimes(player, 11, 60);
    expect(onProgress.mock.calls.length).toBe(callsBefore);
  });

  it("survives a player that throws", () => {
    const onComplete = vi.fn();
    const tracker = createVideoTracker({ onComplete });
    const player = makePlayer();
    player.getDuration = () => {
      throw new Error("player gone");
    };
    tracker.attach(player);
    expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
    expect(onComplete).not.toHaveBeenCalled();
    tracker.detach();
  });
});
