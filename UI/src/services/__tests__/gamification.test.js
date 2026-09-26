import { describe, expect, it } from "vitest";
import {
  DAILY_GOAL_EVENTS,
  XP_REWARDS,
  addXp,
  applyRewards,
  levelFor,
  quizXp,
} from "../gamification.js";
import { freshState } from "../storage.js";
import { touchActivity } from "../progress.js";
import { todayKey, yesterdayKey } from "../../lib/format.js";
function withTodayEvents(count) {
  let state = freshState();
  for (let i = 0; i < count; i += 1) state = touchActivity(state);
  return state;
}

describe("levelFor", () => {
  it("starts at level one", () => {
    const result = levelFor(0);
    expect(result.level).toBe(1);
    expect(result.progress).toBe(0);
  });

  it("sits at level two exactly at its threshold", () => {
    const result = levelFor(150);
    expect(result.level).toBe(2);
    expect(result.progress).toBe(0);
  });

  it("reports fractional progress toward the next level", () => {
    const result = levelFor(75);
    expect(result.level).toBe(1);
    expect(result.next.xp).toBe(150);
    expect(result.progress).toBe(0.5);
  });

  it("caps progress at one on the top level", () => {
    const top = 100000;
    expect(levelFor(top).progress).toBe(1);
    expect(levelFor(top).next).toBeNull();
  });
});

describe("quizXp", () => {
  it("awards only the base below seventy percent", () => {
    expect(quizXp(0)).toBe(XP_REWARDS.quizBase);
    expect(quizXp(70)).toBe(XP_REWARDS.quizBase);
  });

  it("awards bonus points above seventy percent", () => {
    expect(quizXp(80)).toBe(XP_REWARDS.quizBase + 10 * XP_REWARDS.quizPerPointAbove70);
    expect(quizXp(100)).toBe(XP_REWARDS.quizBase + 30 * XP_REWARDS.quizPerPointAbove70);
  });
});

describe("applyRewards", () => {
  it("carries an xp gain and records the streak", () => {
    const prev = freshState();
    const next = withTodayEvents(1);
    const result = applyRewards(prev, next);
    expect(result.state.gamification.xp).toBe(0);
    expect(result.state.gamification.streak).toBe(1);
    expect(result.leveledUp).toBeNull();
  });

  it("adds xp that the update produced", () => {
    const prev = freshState();
    const next = addXp(withTodayEvents(1), 10);
    const result = applyRewards(prev, next);
    expect(result.state.gamification.xp).toBe(10);
    expect(result.state.gamification.streak).toBe(1);
  });

  it("awards the daily goal once when the third event lands", () => {
    const prev = withTodayEvents(DAILY_GOAL_EVENTS - 1);
    const next = withTodayEvents(DAILY_GOAL_EVENTS);
    const result = applyRewards(prev, next);
    expect(result.state.gamification.xp).toBe(XP_REWARDS.dailyGoal);
    const today = result.state.activity.find((day) => day.date === todayKey());
    expect(today.goalAwarded).toBe(true);
  });

  it("never awards the daily goal twice", () => {
    const first = applyRewards(
      withTodayEvents(DAILY_GOAL_EVENTS - 1),
      withTodayEvents(DAILY_GOAL_EVENTS),
    );
    const second = applyRewards(first.state, touchActivity({ ...first.state }));
    expect(second.state.gamification.xp).toBe(XP_REWARDS.dailyGoal);
    expect(second.state.gamification.xp - first.state.gamification.xp).toBe(0);
  });

  it("stays below the goal without enough events", () => {
    const result = applyRewards(freshState(), withTodayEvents(2));
    expect(result.state.gamification.xp).toBe(0);
  });

  it("reports a level up when xp crosses a threshold", () => {
    const prev = freshState();
    prev.gamification.xp = 140;
    const next = addXp(touchActivity({ ...prev }), 20);
    const result = applyRewards(prev, next);
    expect(result.state.gamification.xp).toBe(160);
    expect(result.leveledUp).toBe(2);
  });

  it("counts a streak across yesterday and today", () => {
    const prev = freshState();
    const next = withTodayEvents(1);
    next.activity.unshift({ date: yesterdayKey(), events: 4 });
    const result = applyRewards(prev, next);
    expect(result.state.gamification.streak).toBe(2);
  });
});
