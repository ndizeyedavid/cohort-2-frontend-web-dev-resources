import { describe, expect, it } from "vitest";
import {
  currentStreak,
  itemState,
  keys,
  moduleStats,
  recordQuizAttempt,
  setItemState,
  touchActivity,
} from "../progress.js";
import { freshState } from "../storage.js";
import { relatedTo } from "../catalog.js";
import { modules } from "../catalog.js";
import { percent, todayKey, yesterdayKey } from "../../lib/format.js";

function daysAgo(count) {
  return todayKey(new Date(Date.now() - count * 86400000));
}

describe("keys", () => {
  it("builds stable item keys", () => {
    expect(keys.lesson("week-01", "l1")).toBe("lesson:week-01/l1");
    expect(keys.quiz("q1")).toBe("quiz:q1");
    expect(keys.link("k1")).toBe("link:k1");
    expect(keys.video("v1")).toBe("video:v1");
  });
});

describe("itemState and setItemState", () => {
  it("defaults to pending for unknown items", () => {
    expect(itemState(freshState(), "lesson:week-01/missing")).toBe("pending");
  });

  it("records a completed state with a timestamp", () => {
    const next = setItemState(freshState(), "lesson:week-01/l1", "completed");
    expect(itemState(next, "lesson:week-01/l1")).toBe("completed");
    expect(next.progress.items["lesson:week-01/l1"].at).toBeTruthy();
  });

  it("removes the entry when reset to pending", () => {
    let state = setItemState(freshState(), "lesson:week-01/l1", "completed");
    state = setItemState(state, "lesson:week-01/l1", "pending");
    expect(state.progress.items["lesson:week-01/l1"]).toBeUndefined();
    expect(itemState(state, "lesson:week-01/l1")).toBe("pending");
  });
});

describe("recordQuizAttempt", () => {
  it("tracks best percent and attempt count", () => {
    let state = freshState();
    state = recordQuizAttempt(state, "q1", 3, 5);
    const first = state.progress.quizAttempts.q1;
    expect(first.best).toBe(60);
    expect(first.count).toBe(1);

    state = recordQuizAttempt(state, "q1", 5, 5);
    expect(state.progress.quizAttempts.q1.best).toBe(100);
    expect(state.progress.quizAttempts.q1.count).toBe(2);
  });

  it("never lowers a previous best", () => {
    let state = recordQuizAttempt(freshState(), "q1", 5, 5);
    state = recordQuizAttempt(state, "q1", 1, 5);
    expect(state.progress.quizAttempts.q1.best).toBe(100);
  });

  it("keeps only the last ten attempts", () => {
    let state = freshState();
    for (let i = 0; i < 12; i += 1) {
      state = recordQuizAttempt(state, "q1", 1, 5);
    }
    expect(state.progress.quizAttempts.q1.attempts.length).toBe(10);
    expect(state.progress.quizAttempts.q1.count).toBe(12);
  });

  it("handles a zero total without dividing", () => {
    const state = recordQuizAttempt(freshState(), "q1", 0, 0);
    expect(state.progress.quizAttempts.q1.best).toBe(0);
  });
});

describe("touchActivity", () => {
  it("increments today's event count", () => {
    let state = touchActivity(freshState());
    state = touchActivity(state);
    const today = state.activity.find((day) => day.date === todayKey());
    expect(today.events).toBe(2);
  });

  it("caps the log at ninety days", () => {
    let state = freshState();
    state.activity = Array.from({ length: 90 }, (_, i) => ({
      date: daysAgo(i + 1),
      events: 1,
    }));
    state = touchActivity(state);
    expect(state.activity.length).toBe(90);
    expect(state.activity.at(-1).date).toBe(todayKey());
  });
});

describe("currentStreak", () => {
  it("is zero with no activity", () => {
    expect(currentStreak([])).toBe(0);
  });

  it("counts today as one", () => {
    expect(currentStreak([{ date: todayKey(), events: 1 }])).toBe(1);
  });

  it("counts consecutive days", () => {
    const activity = [
      { date: daysAgo(2), events: 1 },
      { date: yesterdayKey(), events: 1 },
      { date: todayKey(), events: 1 },
    ];
    expect(currentStreak(activity)).toBe(3);
  });

  it("continues a streak from yesterday when today has no activity", () => {
    expect(currentStreak([{ date: yesterdayKey(), events: 2 }])).toBe(1);
  });

  it("is zero when the last activity is older than yesterday", () => {
    expect(currentStreak([{ date: daysAgo(3), events: 1 }])).toBe(0);
  });
});

describe("moduleStats", () => {
  it("returns zeros for a missing module", () => {
    expect(moduleStats(undefined, freshState())).toEqual({
      total: 0,
      done: 0,
      percent: 0,
    });
  });

  it("counts completed lessons of a real module", () => {
    const module = modules[0];
    const related = relatedTo(module.id);
    const total =
      module.lessons.length +
      related.linkIds.length +
      related.videoIds.length +
      related.quizIds.length;
    const state = setItemState(
      freshState(),
      keys.lesson(module.id, module.lessons[0].id),
      "completed",
    );
    const stats = moduleStats(module, state);
    expect(stats.total).toBe(total);
    expect(stats.done).toBe(1);
    expect(stats.percent).toBe(percent(1, total));
  });

  it("counts quizzes that have at least one attempt", () => {
    const module = modules[0];
    const quizId = relatedTo(module.id).quizIds[0];
    let state = freshState();
    if (quizId) state = recordQuizAttempt(state, quizId, 1, 5);
    const stats = moduleStats(module, state);
    expect(stats.done).toBe(quizId ? 1 : 0);
  });
});
