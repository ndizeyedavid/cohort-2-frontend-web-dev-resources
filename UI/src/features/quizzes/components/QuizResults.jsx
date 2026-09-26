import { Link } from "react-router-dom";
import Button from "../../../ui/Button.jsx";
import BadgeChip from "../../../ui/BadgeChip.jsx";
import Icon from "../../../ui/Icon.jsx";

function yourAnswer(question, answer) {
  if (answer === null || answer === "" || answer === undefined) return "Skipped";
  if (question.type === "mcq") return question.options[Number(answer)] ?? "Skipped";
  return String(answer);
}

function ReviewRow({ question, result, answer, onSelfMark }) {
  const correct = result.correct;

  return (
    <li className="card glass p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-bold text-[15px] text-water">{question.prompt}</p>
        <BadgeChip tone={correct ? "success" : "accent"} className="gap-1 shrink-0">
          <Icon name={correct ? "check" : "close"} size={12} strokeWidth={2.4} />
          {correct ? "Correct" : "Not yet"}
        </BadgeChip>
      </div>

      <p className="text-sm mt-2.5 text-water">
        <span className="text-water/55">Your answer: </span>
        <span className={correct ? "text-secondary font-semibold" : "text-error line-through"}>
          {yourAnswer(question, answer)}
        </span>
      </p>

      <p className="text-sm mt-1.5 text-water/65">{result.feedback}</p>

      {question.type !== "mcq" ? (
        <details className="mt-3">
          <summary className="eyebrow cursor-pointer hover:text-primary transition-colors">
            Show model answer
          </summary>
          <pre
            className="mt-2 rounded-inner p-3.5 text-[13px] overflow-x-auto font-mono text-white border border-white/20"
            style={{ backgroundImage: "linear-gradient(180deg, #0d5b83 0%, #062f47 100%)" }}
          >
            {String(question.answer)}
          </pre>
        </details>
      ) : null}

      {result.selfCheck ? (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[12.5px] text-water/60">Did you get it right?</span>
          <Button size="xs" variant="secondary" onClick={() => onSelfMark(true)}>
            Yes, mark correct
          </Button>
          <Button size="xs" variant="ghost" onClick={() => onSelfMark(false)}>
            No
          </Button>
        </div>
      ) : null}
    </li>
  );
}

export default function QuizResults({ quiz, runner }) {
  const percent = Math.round((runner.score / runner.total) * 100);
  const message =
    percent >= 90
      ? "Excellent, you know this."
      : percent >= 70
        ? "Solid work, a little review will seal it."
        : "Worth another run. Read the feedback below first.";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <section className="card sky-panel overflow-hidden relative">
        <span className="absolute top-0 inset-x-0 h-1.5 bg-sun" aria-hidden="true" />
        <div className="px-6 py-8 text-center relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
            Your score
          </p>
          <p className="font-display text-5xl font-bold mt-2 tabular-nums">
            {runner.score}
            <span className="text-2xl text-white/70">/{runner.total}</span>
          </p>
          <p className="text-[15px] text-white/90 mt-2">{message}</p>
          <p className="font-mono text-[11px] text-white/75 mt-1 tabular-nums">{percent}%</p>
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            <Button variant="accent" onClick={runner.retry}>
              Retry quiz
            </Button>
            <Link to="/quizzes">
              <Button variant="glass">Back to quizzes</Button>
            </Link>
          </div>
        </div>
      </section>

      <ul className="space-y-3">
        {quiz.questions.map((question, index) => (
          <ReviewRow
            key={question.id || index}
            question={question}
            result={runner.results[index]}
            answer={runner.answers[index]}
            onSelfMark={(value) => runner.selfMark(index, value)}
          />
        ))}
      </ul>
    </div>
  );
}
