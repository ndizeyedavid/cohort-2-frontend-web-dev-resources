import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuizRunner } from "../hooks/useQuizRunner.js";
import McqQuestion from "./McqQuestion.jsx";
import ShortQuestion from "./ShortQuestion.jsx";
import CodeQuestion from "./CodeQuestion.jsx";
import QuizResults from "./QuizResults.jsx";
import ProgressBar from "../../../ui/ProgressBar.jsx";
import Button from "../../../ui/Button.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useTutor } from "../../../app/providers/TutorProvider.jsx";

function QuestionBody({ question, value, onChange }) {
  if (question.type === "mcq") {
    return <McqQuestion question={question} value={value} onChange={onChange} />;
  }
  if (question.type === "code") {
    return <CodeQuestion question={question} value={value} onChange={onChange} />;
  }
  return <ShortQuestion question={question} value={value} onChange={onChange} />;
}

export default function QuizRunner({ quiz }) {
  const runner = useQuizRunner(quiz);
  const { openTutor, setFocusQuestion } = useTutor();

  useEffect(() => {
    setFocusQuestion(runner.phase === "answering" ? runner.question.prompt : null);
    return () => setFocusQuestion(null);
  }, [runner.phase, runner.question, setFocusQuestion]);

  if (runner.phase === "results") {
    return <QuizResults quiz={quiz} runner={runner} />;
  }

  const isFirst = runner.index === 0;
  const isLast = runner.index === runner.total - 1;
  const value = runner.answers[runner.index];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          to="/quizzes"
          className="lift text-[13.5px] font-bold text-water/60 hover:text-primary transition-colors"
        >
          <Icon name="arrowLeft" size={16} />
          All quizzes
        </Link>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-water/50 tabular-nums">
          Question {runner.index + 1} of {runner.total}
        </span>
      </div>

      <div className="card glass p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-xl font-bold leading-snug text-water">
            {runner.question.prompt}
          </h1>
          <button
            type="button"
            onClick={openTutor}
            className="lift btn btn-xs rounded-pill border-0 text-white shrink-0"
            style={{
              backgroundImage: "linear-gradient(160deg, #a8ecd8 0%, #12b8c4 100%)",
              boxShadow: "0 8px 18px -10px rgba(18,184,196,0.95)",
            }}
            title="Ask the tutor about this question"
          >
            <Icon name="sparkle" size={13} />
            Stuck?
          </button>
        </div>

        <div className="mt-6">
          {runner.phase === "grading" ? (
            <div className="py-12 grid place-items-center gap-3 text-center">
              <Spinner label="Grading your answers" />
              <p className="text-[12.5px] text-water/55 max-w-xs">
                Multiple choice is instant. Written answers get a proper read.
              </p>
            </div>
          ) : (
            <QuestionBody
              question={runner.question}
              value={value}
              onChange={runner.answer}
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-7">
          <Button
            variant="ghost"
            disabled={isFirst || runner.phase === "grading"}
            onClick={() => runner.go(-1)}
          >
            <Icon name="arrowLeft" size={16} />
            Previous
          </Button>
          {isLast ? (
            <Button
              variant="secondary"
              disabled={runner.phase === "grading"}
              onClick={runner.submit}
              title={
                runner.answeredCount < runner.total
                  ? "Unanswered questions score zero"
                  : undefined
              }
            >
              Submit quiz
            </Button>
          ) : (
            <Button
              variant={value === null || value === "" ? "glass" : "primary"}
              disabled={runner.phase === "grading"}
              onClick={() => runner.go(1)}
            >
              Next
              <Icon name="arrowRight" size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar
          value={(runner.answeredCount / runner.total) * 100}
          showLabel
          size="sm"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-water/45 mt-2">
          {runner.answeredCount} of {runner.total} answered
        </p>
      </div>
    </div>
  );
}
