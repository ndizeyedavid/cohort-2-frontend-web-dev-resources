import { Link } from "react-router-dom";
import ItemCard from "../../../ui/ItemCard.jsx";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import { itemState, keys } from "../../../services/progress.js";

export default function ModuleLessons({ module }) {
  const { state } = useVault();

  return (
    <section>
      <SectionHeading icon="book" eyebrow={`${module.lessons.length} lessons`}>
        Lessons
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-3">
        {module.lessons.map((lesson, index) => {
          const done = itemState(state, keys.lesson(module.id, lesson.id)) === "completed";
          return (
            <ItemCard
              key={lesson.id}
              icon={done ? "check" : "book"}
              done={done}
              title={
                <Link to={`/modules/${module.id}/${lesson.id}`} className="hover:text-primary">
                  {lesson.title}
                </Link>
              }
              description={lesson.summary}
              meta={`${String(index + 1).padStart(2, "0")} · ${lesson.minutes} min read`}
              action={<Icon name="arrowRight" size={17} className="text-water/35" />}
            />
          );
        })}
      </div>
    </section>
  );
}
