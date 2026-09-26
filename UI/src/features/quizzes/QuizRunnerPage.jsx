import { getQuiz } from "../../services/catalog.js";
import { useVault } from "../../app/providers/VaultProvider.jsx";
import { Navigate, useParams } from "react-router-dom";
import QuizRunner from "./components/QuizRunner.jsx";

export default function QuizRunnerPage() {
  const { quizId } = useParams();
  const { state } = useVault();
  const quiz = getQuiz(quizId) || state.generatedQuizzes.find((item) => item.id === quizId);

  if (!quiz) return <Navigate to="/quizzes" replace />;
  return <QuizRunner key={quiz.id} quiz={quiz} />;
}
