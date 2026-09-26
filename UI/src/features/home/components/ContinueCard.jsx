import { Link } from "react-router-dom";
import { modules } from "../../../services/catalog.js";
import { itemState, keys } from "../../../services/progress.js";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import Button from "../../../ui/Button.jsx";
import Icon from "../../../ui/Icon.jsx";

function firstUnfinished(state) {
  for (const module of modules) {
    for (const lesson of module.lessons) {
      const status = itemState(state, keys.lesson(module.id, lesson.id));
      if (status !== "completed") {
        return { module, lesson };
      }
    }
  }
  return null;
}

function AllDone() {
  return (
    <section className="card glass overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-secondary to-aqua" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            className="grid place-items-center size-11 sphere border-2 border-white text-white shrink-0"
            style={{
              backgroundImage: "linear-gradient(160deg, #6fd46f 0%, #3fb54a 100%)",
              boxShadow: "0 10px 22px -10px rgba(63,181,74,0.95)",
            }}
          >
            <Icon name="check" size={22} strokeWidth={2.4} />
          </span>
          <div>
            <h2 className="font-display font-bold text-lg text-water">
              Every lesson is done
            </h2>
            <p className="text-[13.5px] text-water/65 mt-0.5">
              All five modules are finished. Generate a fresh quiz to stay sharp.
            </p>
          </div>
        </div>
        <Link to="/quizzes" className="shrink-0">
          <Button variant="secondary" size="sm">
            Practice a quiz
            <Icon name="arrowRight" size={15} />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default function ContinueCard() {
  const { state } = useVault();
  const target = firstUnfinished(state);

  if (!target) return <AllDone />;

  const { module, lesson } = target;

  return (
    <section className="card glass overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-aqua to-primary" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="eyebrow mb-1.5">Up next</p>
          <h2 className="font-display text-lg font-bold text-water leading-snug">
            {lesson.title}
          </h2>
          <p className="text-[13.5px] text-water/65 mt-1.5">
            Week {module.week}: {module.title} · {lesson.minutes} min read
          </p>
        </div>
        <Link to={`/modules/${module.id}/${lesson.id}`} className="shrink-0">
          <Button>
            Resume lesson
            <Icon name="arrowRight" size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
}
