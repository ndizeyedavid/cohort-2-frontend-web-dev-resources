import { Link } from "react-router-dom";
import { modules, quizzes } from "../../services/catalog.js";
import { useVault } from "../../app/providers/VaultProvider.jsx";
import ItemCard from "../../ui/ItemCard.jsx";
import BadgeChip from "../../ui/BadgeChip.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import PageHeader from "../../ui/PageHeader.jsx";
import Icon from "../../ui/Icon.jsx";
import GenerateQuizCard from "./components/GenerateQuizCard.jsx";

function TakeLink({ to, label }) {
  return (
    <Link
      to={to}
      className="lift text-[13.5px] font-bold text-primary hover:underline whitespace-nowrap"
    >
      {label}
      <Icon name="arrowRight" size={16} />
    </Link>
  );
}

function QuizRow({ quiz }) {
  const { state } = useVault();
  const attempt = state.progress.quizAttempts[quiz.id];
  const done = (attempt?.count || 0) > 0;
  const passed = done && attempt.best >= 70;

  return (
    <ItemCard
      icon={passed ? "check" : "sparkle"}
      done={passed}
      title={
        <Link to={`/quizzes/${quiz.id}`} className="hover:text-primary">
          {quiz.title}
        </Link>
      }
      description={`${quiz.questions.length} questions`}
      meta={
        done
          ? `Best ${attempt.best}% · ${attempt.count} attempt${attempt.count === 1 ? "" : "s"}`
          : "Not attempted yet"
      }
      badge={done ? <BadgeChip tone={passed ? "success" : "glass"}>{attempt.best}%</BadgeChip> : null}
      action={<TakeLink to={`/quizzes/${quiz.id}`} label={done ? "Retake" : "Start"} />}
    />
  );
}

function GeneratedRow({ quiz }) {
  const { state, deleteGeneratedQuiz } = useVault();
  const attempt = state.progress.quizAttempts[quiz.id];
  const done = (attempt?.count || 0) > 0;
  const passed = done && attempt.best >= 70;

  return (
    <ItemCard
      icon={passed ? "check" : "sparkle"}
      done={passed}
      title={
        <Link to={`/quizzes/${quiz.id}`} className="hover:text-primary">
          {quiz.title}
        </Link>
      }
      description={`${quiz.questions.length} questions, generated for you`}
      meta={done ? `Best ${attempt.best}%` : "Not attempted yet"}
      badge={done ? <BadgeChip tone={passed ? "success" : "glass"}>{attempt.best}%</BadgeChip> : null}
      action={
        <div className="flex items-center gap-3.5">
          <TakeLink to={`/quizzes/${quiz.id}`} label={done ? "Retake" : "Start"} />
          <button
            type="button"
            className="text-[12.5px] font-bold text-water/50 hover:text-error transition-colors"
            onClick={() => deleteGeneratedQuiz(quiz.id)}
          >
            Delete
          </button>
        </div>
      }
    />
  );
}

export default function QuizzesPage() {
  const { state } = useVault();
  const generated = state.generatedQuizzes;

  return (
    <div className="space-y-9">
      <PageHeader
        eyebrow="Practice"
        title="Quizzes"
        description="A practice set for every week, plus personal quizzes written for you. Scores save automatically."
      />

      {generated.length ? (
        <section>
          <SectionHeading icon="sparkle" eyebrow="Saved on this device">
            Your generated quizzes
          </SectionHeading>
          <div className="space-y-3">
            {generated.map((quiz) => (
              <GeneratedRow key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      ) : null}

      <GenerateQuizCard />

      <section>
        <SectionHeading icon="sparkle" eyebrow={`${quizzes.length} sets`}>
          Class quizzes
        </SectionHeading>
        <div className="space-y-7">
          {modules.map((module) => {
            const items = quizzes.filter((quiz) => quiz.moduleId === module.id);
            if (!items.length) return null;
            return (
              <div key={module.id}>
                <p className="eyebrow mb-2.5">
                  Week {String(module.week).padStart(2, "0")}: {module.title}
                </p>
                <div className="space-y-3">
                  {items.map((quiz) => (
                    <QuizRow key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
