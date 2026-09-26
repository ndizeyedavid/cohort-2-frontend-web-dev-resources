import { Link } from "react-router-dom";
import { getQuiz } from "../../../services/catalog.js";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import EmptyState from "../../../ui/EmptyState.jsx";
import { formatDate } from "../../../lib/format.js";

export default function QuizScoreList({ state }) {
  const rows = Object.entries(state.progress.quizAttempts)
    .map(([quizId, attempt]) => {
      const quiz =
        getQuiz(quizId) ||
        state.generatedQuizzes.find((item) => item.id === quizId);
      if (!quiz || !attempt.attempts.length) return null;
      const last = attempt.attempts[attempt.attempts.length - 1];
      return { quizId, quiz, attempt, last };
    })
    .filter(Boolean)
    .sort((a, b) => (b.last.at || "").localeCompare(a.last.at || ""));

  return (
    <section>
      <SectionHeading icon="sparkle" eyebrow="Attempts">
        Quiz scores
      </SectionHeading>
      {rows.length ? (
        <div className="card glass overflow-hidden divide-y divide-base-300/70">
          {rows.map(({ quizId, quiz, attempt, last }) => {
            const passed = attempt.best >= 70;
            return (
              <Link
                key={quizId}
                to={`/quizzes/${quizId}`}
                className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-sky-soft transition-colors"
              >
                <span
                  className={`size-11 sphere grid place-items-center font-display font-bold text-sm shrink-0 border-2 border-white ${
                    passed ? "text-white" : "text-water"
                  }`}
                  style={{
                    backgroundImage: passed
                      ? "linear-gradient(160deg, #6fd46f 0%, #3fb54a 100%)"
                      : "linear-gradient(160deg, #eaf6fd 0%, #cfe9f6 100%)",
                    boxShadow: passed
                      ? "0 8px 18px -9px rgba(63,181,74,0.95)"
                      : "0 6px 14px -10px rgba(10,74,107,0.6)",
                  }}
                >
                  {attempt.best}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-water truncate">{quiz.title}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-water/45 mt-1.5">
                    {attempt.count} attempt{attempt.count === 1 ? "" : "s"} · last{" "}
                    {formatDate(last.at)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="sparkle"
          title="No quiz attempts yet"
          description="Take any quiz and your best score will show up here."
        />
      )}
    </section>
  );
}
