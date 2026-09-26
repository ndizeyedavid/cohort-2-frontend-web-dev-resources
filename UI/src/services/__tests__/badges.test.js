import { describe, expect, it } from "vitest";
import { ALL_BADGES, LEVELS, evaluateBadges, relatedCounts } from "../badges.js";
import { freshState } from "../storage.js";
import { keys, recordQuizAttempt, setItemState } from "../progress.js";
import { modules, relatedTo } from "../catalog.js";

function completeModule(state, moduleId) {
  const module = modules.find((item) => item.id === moduleId);
  let next = state;
  for (const lesson of module.lessons) {
    next = setItemState(next, keys.lesson(moduleId, lesson.id), "completed");
  }
  const related = relatedTo(moduleId);
  for (const id of related.linkIds) {
    next = setItemState(next, keys.link(id), "completed");
  }
  for (const id of related.videoIds) {
    next = setItemState(next, keys.video(id), "completed");
  }
  for (const id of related.quizIds) {
    next = recordQuizAttempt(next, id, 5, 5);
  }
  return next;
}

function firstLessonDone(state) {
  const module = modules[0];
  return setItemState(
    state,
    keys.lesson(module.id, module.lessons[0].id),
    "completed",
  );
}

describe("badge catalog", () => {
  it("has unique badge ids", () => {
    const ids = ALL_BADGES.map((badge) => badge.id);
    expect(ids.length).toBe(14);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has ascending level thresholds", () => {
    expect(LEVELS.length).toBe(8);
    for (let i = 1; i < LEVELS.length; i += 1) {
      expect(LEVELS[i].xp).toBeGreaterThan(LEVELS[i - 1].xp);
    }
  });
});

describe("evaluateBadges", () => {
  it("unlocks nothing on a fresh vault", () => {
    const { unlocked } = evaluateBadges(freshState(), 0);
    expect(unlocked).toEqual([]);
  });

  it("unlocks the first lesson badge after one lesson", () => {
    const { unlocked } = evaluateBadges(firstLessonDone(freshState()), 0);
    expect(unlocked).toContain("first-lesson");
    expect(unlocked).not.toContain("page-turner");
  });

  it("does not re unlock owned badges", () => {
    const state = firstLessonDone(freshState());
    state.gamification.badges = ["first-lesson"];
    const { unlocked } = evaluateBadges(state, 0);
    expect(unlocked).not.toContain("first-lesson");
  });

  it("unlocks quiz badges from best scores", () => {
    let state = freshState();
    state = recordQuizAttempt(state, "quiz-week-01-regex", 4, 5);
    const { unlocked } = evaluateBadges(state, 0);
    expect(unlocked).toContain("quiz-starter");
    expect(unlocked).not.toContain("answer-machine");
  });

  it("unlocks streak badges by day count", () => {
    const seven = evaluateBadges(freshState(), 7);
    expect(seven.unlocked).toContain("streak-7");
    expect(seven.unlocked).not.toContain("streak-14");
    const fourteen = evaluateBadges(freshState(), 14);
    expect(fourteen.unlocked).toContain("streak-14");
  });

  it("unlocks a module badge only when the module is complete", () => {
    const partial = evaluateBadges(firstLessonDone(freshState()), 0);
    expect(partial.unlocked).not.toContain("pattern-spotter");

    const done = evaluateBadges(completeModule(freshState(), "week-01"), 0);
    expect(done.unlocked).toContain("pattern-spotter");
  });
});

describe("relatedCounts", () => {
  it("matches the catalog join for a module", () => {
    expect(relatedCounts("week-01")).toEqual(relatedTo("week-01"));
  });

  it("returns empty ids for an unknown module", () => {
    const counts = relatedCounts("missing");
    expect(counts.linkIds).toEqual([]);
    expect(counts.quizIds).toEqual([]);
  });
});
