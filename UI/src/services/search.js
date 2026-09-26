import { modules, videos, quizzes, links, icebreakers } from "./catalog.js";
import { stripMarkdown } from "../lib/markdown.js";

let cache = null;

function entry(type, item, route, extra = {}) {
  return {
    type,
    id: item.id,
    title: item.title,
    subtitle: item.summary || item.description || "",
    moduleId: item.moduleId || extra.moduleId || null,
    route,
    haystack: [item.title, item.summary, item.description, item.tags, extra.blob]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

export function buildIndex() {
  if (cache) return cache;

  const items = [];

  for (const module of modules) {
    for (const lesson of module.lessons || []) {
      items.push(
        entry("lesson", lesson, `/modules/${module.id}/${lesson.id}`, {
          moduleId: module.id,
          blob: stripMarkdown(lesson.content).slice(0, 600),
        }),
      );
    }
    items.push(
      entry("module", module, `/modules/${module.id}`, { moduleId: module.id }),
    );
  }

  for (const quiz of quizzes) {
    items.push(entry("quiz", quiz, `/quizzes/${quiz.id}`));
  }
  for (const video of videos) {
    items.push(entry("video", video, `/videos?v=${video.id}`));
  }
  for (const link of links) {
    items.push(entry("link", link, `/modules/${link.moduleId}`));
  }
  for (const deck of icebreakers) {
    items.push(entry("icebreaker", deck, `/icebreakers?v=${deck.id}`));
  }

  cache = items;
  return items;
}

export function invalidateIndex() {
  cache = null;
}

function score(haystack, tokens) {
  let total = 0;
  for (const token of tokens) {
    if (!haystack.includes(token)) return 0;
    total += haystack.startsWith(token) ? 3 : 1;
  }
  return total;
}

export function search(query, limit = 10) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  return buildIndex()
    .map((item) => ({ ...item, score: score(item.haystack, tokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
