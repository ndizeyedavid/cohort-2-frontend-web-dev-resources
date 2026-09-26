import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Markdown from "../../ui/Markdown.jsx";
import BadgeChip from "../../ui/BadgeChip.jsx";
import Button from "../../ui/Button.jsx";
import Icon from "../../ui/Icon.jsx";
import ProgressBar from "../../ui/ProgressBar.jsx";
import { getLesson } from "../../services/catalog.js";
import { useLessonTracker } from "../../app/hooks/useLessonTracker.js";
import { useTutor } from "../../app/providers/TutorProvider.jsx";

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const found = getLesson(moduleId, lessonId);
  const articleRef = useRef(null);
  const { openTutor } = useTutor();

  const { progress, completed } = useLessonTracker({
    moduleId,
    lessonId,
    minutes: found?.lesson.minutes,
    articleRef,
  });

  if (!found) return <Navigate to="/modules" replace />;

  const { lesson, module } = found;
  const index = module.lessons.findIndex((item) => item.id === lesson.id);
  const next = module.lessons[index + 1];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-5">
        <Link
          to={`/modules/${module.id}`}
          className="lift text-[13.5px] font-bold text-water/60 hover:text-primary transition-colors"
        >
          <Icon name="arrowLeft" size={16} />
          {module.title}
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-water/50">
            {lesson.minutes} min read
          </span>
          {completed ? (
            <BadgeChip tone="success" className="gap-1">
              <Icon name="check" size={12} strokeWidth={2.6} />
              Done
            </BadgeChip>
          ) : null}
        </div>
      </div>

      <div className="sticky top-[76px] z-30 mb-6 py-2 bg-transparent">
        <ProgressBar value={progress * 100} size="xs" tone="primary" />
      </div>

      <header className="mb-6">
        <p className="eyebrow mb-2">
          Week {String(module.week).padStart(2, "0")} · Lesson {index + 1} of{" "}
          {module.lessons.length}
        </p>
        <h1 className="font-display text-[29px] sm:text-[34px] font-bold leading-[1.1] text-water">
          {lesson.title}
        </h1>
        <p className="text-water/70 text-[15px] mt-2.5 leading-relaxed">{lesson.summary}</p>
        <Button variant="glass" size="sm" className="mt-4" onClick={openTutor}>
          <Icon name="sparkle" size={15} />
          Ask the tutor about this lesson
        </Button>
      </header>

      <article ref={articleRef} className="card glass p-5 sm:p-8">
        <Markdown>{lesson.content}</Markdown>
      </article>

      <div className="flex justify-end items-center mt-6">
        {next ? (
          <Link to={`/modules/${module.id}/${next.id}`}>
            <Button>
              Next: {next.title}
              <Icon name="arrowRight" size={16} />
            </Button>
          </Link>
        ) : (
          <Link to={`/modules/${module.id}`}>
            <Button variant="glass">
              Back to module
              <Icon name="arrowRight" size={16} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
