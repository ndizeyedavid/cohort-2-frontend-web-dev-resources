import modules from "../data/modules.json";
import videos from "../data/videos.json";
import quizzes from "../data/quizzes.json";
import links from "../data/links.json";
import icebreakers from "../data/icebreakers.json";

export { modules, videos, quizzes, links, icebreakers };

export function getModule(id) {
  return modules.find((module) => module.id === id) || null;
}

export function getLesson(moduleId, lessonId) {
  const module = getModule(moduleId);
  if (!module) return null;
  const lesson = (module.lessons || []).find((item) => item.id === lessonId);
  return lesson ? { lesson, module } : null;
}

export function getVideo(id) {
  return videos.find((video) => video.id === id) || null;
}

export function getLink(id) {
  return links.find((link) => link.id === id) || null;
}

export function getQuiz(id) {
  return quizzes.find((quiz) => quiz.id === id) || null;
}

export function getIcebreaker(id) {
  return icebreakers.find((deck) => deck.id === id) || null;
}

const relatedCache = new Map();

export function relatedTo(moduleId) {
  if (relatedCache.has(moduleId)) return relatedCache.get(moduleId);
  const related = {
    videoIds: videos.filter((video) => video.moduleId === moduleId).map((video) => video.id),
    quizIds: quizzes.filter((quiz) => quiz.moduleId === moduleId).map((quiz) => quiz.id),
    linkIds: links.filter((link) => link.moduleId === moduleId).map((link) => link.id),
  };
  relatedCache.set(moduleId, related);
  return related;
}
