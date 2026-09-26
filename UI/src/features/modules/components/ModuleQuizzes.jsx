import { Link } from "react-router-dom";
import ItemCard from "../../../ui/ItemCard.jsx";
import BadgeChip from "../../../ui/BadgeChip.jsx";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import { getQuiz, relatedTo } from "../../../services/catalog.js";

export default function ModuleQuizzes({ moduleId }) {
  const { state } = useVault();
  const authored = relatedTo(moduleId).quizIds.map(getQuiz).filter(Boolean);
  const generated = state.generatedQuizzes.filter((quiz) => quiz.moduleId === moduleId);
  const all = [...authored, ...generated];

  if (!all.length) return null;

  return (
    <section>
      <SectionHeading icon="sparkle" eyebrow="Test yourself">
        Quizzes
      </SectionHeading>
      <div className="space-y-3">
        {all.map((quiz) => {
          const attempt = state.progress.quizAttempts[quiz.id];
          const done = (attempt?.count || 0) > 0;
          const passed = done && attempt.best >= 70;
          return (
            <ItemCard
              key={quiz.id}
              icon={passed ? "check" : "sparkle"}
              done={passed}
              title={
                <Link to={`/quizzes/${quiz.id}`} className="hover:text-primary">
                  {quiz.title}
                </Link>
              }
              description={
                `${quiz.questions.length} questions` +
                (quiz.generated ? ", generated for you" : "")
              }
              meta={done ? `Best score ${attempt.best}%` : "Not attempted yet"}
              badge={
                done ? (
                  <BadgeChip tone={passed ? "success" : "glass"}>{attempt.best}%</BadgeChip>
                ) : null
              }
              action={
                <Link
                  to={`/quizzes/${quiz.id}`}
                  className="lift text-[13.5px] font-bold text-primary hover:underline whitespace-nowrap"
                >
                  {done ? "Retake" : "Start"}
                  <Icon name="arrowRight" size={16} />
                </Link>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
