import { getLesson, getModule, modules } from "./catalog.js";
import { currentStreak, moduleStats } from "./progress.js";
import { levelFor } from "./gamification.js";
import { truncate } from "../lib/markdown.js";

const RULES = [
  "You are the teaching assistant for cohort 2 of a frontend web development class.",
  "You help students understand lessons, quizzes and exercises they are looking at right now.",
  "Use short sentences and simple words. Give one idea at a time.",
  "Show tiny code examples when code makes it clearer.",
  "If the student seems lost, start from a simpler example before the hard one.",
  "Be honest when you do not know something. Never invent course requirements.",
  "The student's progress is saved locally on their device. There is no account.",
  "When a heading anchor is relevant, call pointAt so the pointer shows the exact spot.",
  "When a short example would help, call showSnippet with the code.",
  "If voice is enabled, speak the main explanation with speak, and keep the text short.",
].join("\n");

function progressDigest(state) {
  const streak = currentStreak(state.activity);
  const level = levelFor(state.gamification.xp);
  const rows = modules.map((module) => {
    const stats = moduleStats(module, state);
    return `${module.title}: ${stats.percent}% done`;
  });
  return [
    `Level ${level.level} (${level.name}), ${state.gamification.xp} xp, streak ${streak} days.`,
    ...rows,
  ].join("\n");
}

function locationBlock(location) {
  if (location.kind === "lesson") {
    const found = getLesson(location.moduleId, location.lessonId);
    if (found) {
      const body = truncate(found.lesson.content, 4000);
      return {
        chip: `Looking at: ${found.module.title} / ${found.lesson.title}`,
        content: `The student is reading the lesson "${found.lesson.title}" in module "${found.module.title}".\n\nLesson content:\n${body}`,
      };
    }
  }

  if (location.kind === "quiz") {
    const question = location.question
      ? `\n\nCurrent question: ${location.question.prompt}`
      : "";
    return {
      chip: location.quizTitle ? `Looking at quiz: ${location.quizTitle}` : "Looking at a quiz",
      content: `The student is taking the quiz "${location.quizTitle || "practice quiz"}".${question}`,
    };
  }

  if (location.kind === "module") {
    const module = getModule(location.moduleId);
    if (module) {
      const lessons = (module.lessons || []).map((lesson) => lesson.title).join(", ");
      return {
        chip: `Looking at: ${module.title}`,
        content: `The student is browsing module "${module.title}". Summary: ${module.summary}\nLessons: ${lessons}`,
      };
    }
  }

  return { chip: "Looking at the home page", content: "The student is on the home page." };
}

export function buildTutorContext({ location, state }) {
  const current = locationBlock(location || { kind: "home" });
  const system = [
    RULES,
    "",
    "STUDENT PROGRESS:",
    progressDigest(state),
    "",
    "CURRENT SCREEN:",
    current.content,
  ].join("\n");

  return { system, chip: current.chip };
}
