import { useLocation } from "react-router-dom";
import { getQuiz, getModule } from "../../../services/catalog.js";
import { useTutor } from "../../../app/providers/TutorProvider.jsx";
import { useVault } from "../../../app/providers/VaultProvider.jsx";

export function useTutorLocation() {
  const { pathname } = useLocation();
  const { focusQuestion } = useTutor();
  const { state } = useVault();
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "modules" && parts[1] && parts[2]) {
    return { kind: "lesson", moduleId: parts[1], lessonId: parts[2] };
  }

  if (parts[0] === "modules" && parts[1]) {
    const module = getModule(parts[1]);
    return {
      kind: "module",
      moduleId: parts[1],
      title: module ? `Week ${module.week}: ${module.title}` : "Module",
    };
  }

  if (parts[0] === "quizzes" && parts[1]) {
    const quiz =
      getQuiz(parts[1]) ||
      state.generatedQuizzes.find((item) => item.id === parts[1]);
    return {
      kind: "quiz",
      quizId: parts[1],
      quizTitle: quiz ? quiz.title : "practice quiz",
      question: focusQuestion ? { prompt: focusQuestion } : null,
    };
  }

  return { kind: "home" };
}
