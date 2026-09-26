import { useCallback, useState } from "react";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import { gradeAll } from "../grading.js";

export function useQuizRunner(quiz) {
  const { submitQuiz } = useVault();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => quiz.questions.map(() => null));
  const [phase, setPhase] = useState("answering");
  const [results, setResults] = useState(null);

  const total = quiz.questions.length;
  const question = quiz.questions[index];
  const answeredCount = answers.filter(
    (answer) => answer !== null && answer !== "",
  ).length;

  const answer = useCallback(
    (value) => {
      setAnswers((prev) => prev.map((item, i) => (i === index ? value : item)));
    },
    [index],
  );

  const go = useCallback(
    (delta) => {
      setIndex((prev) => Math.max(0, Math.min(total - 1, prev + delta)));
    },
    [total],
  );

  const submit = useCallback(async () => {
    setPhase("grading");
    try {
      const graded = await gradeAll(quiz.questions, answers);
      const score = graded.filter((item) => item.correct).length;
      submitQuiz(quiz.id, score, total);
      setResults(graded);
      setPhase("results");
    } catch {
      setPhase("answering");
    }
  }, [quiz, answers, submitQuiz, total]);

  const retry = useCallback(() => {
    setAnswers(quiz.questions.map(() => null));
    setResults(null);
    setIndex(0);
    setPhase("answering");
  }, [quiz]);

  const selfMark = useCallback(
    (resultIndex, value) => {
      setResults((prev) => {
        const next = prev.map((item, i) =>
          i === resultIndex ? { ...item, correct: value, selfCheck: false } : item,
        );
        const score = next.filter((item) => item.correct).length;
        submitQuiz(quiz.id, score, total);
        return next;
      });
    },
    [quiz, submitQuiz, total],
  );

  const score = results ? results.filter((item) => item.correct).length : 0;

  return {
    question,
    index,
    total,
    answers,
    answer,
    go,
    phase,
    submit,
    retry,
    results,
    score,
    answeredCount,
    selfMark,
  };
}
