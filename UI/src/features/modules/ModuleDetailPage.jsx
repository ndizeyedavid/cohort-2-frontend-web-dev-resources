import { Link, Navigate, useParams } from "react-router-dom";
import { getModule, relatedTo } from "../../services/catalog.js";
import { useModuleStats } from "../../app/hooks/useModuleStats.js";
import Icon from "../../ui/Icon.jsx";
import BubbleMeter from "../../ui/BubbleMeter.jsx";
import ModuleLessons from "./components/ModuleLessons.jsx";
import ModuleQuizzes from "./components/ModuleQuizzes.jsx";
import ModuleVideos from "./components/ModuleVideos.jsx";
import ModuleResources from "./components/ModuleResources.jsx";

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = getModule(moduleId);
  const stats = useModuleStats(module);

  if (!module) return <Navigate to="/modules" replace />;

  const hasVideos = relatedTo(module.id).videoIds.length > 0;

  return (
    <div>
      <Link
        to="/modules"
        className="lift text-[13.5px] font-bold text-water/60 hover:text-primary transition-colors"
      >
        <Icon name="arrowLeft" size={16} />
        All modules
      </Link>

      <header className="mt-4 mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        <div className="max-w-2xl">
          <p className="eyebrow mb-2">Week {String(module.week).padStart(2, "0")}</p>
          <h1 className="font-display text-[28px] sm:text-[34px] font-bold leading-[1.1] text-water">
            {module.title}
          </h1>
          <p className="text-water/70 text-[15px] mt-2.5 leading-relaxed">
            {module.summary}
          </p>
        </div>

        <div className="w-full sm:w-60 shrink-0 card glass p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="eyebrow">Module progress</span>
            <span className="font-mono text-[11px] text-water/55 tabular-nums">
              {stats.done}/{stats.total}
            </span>
          </div>
          <div className="mt-3">
            <BubbleMeter value={stats.percent} count={6} size={19} />
          </div>
          <p className="text-[12.5px] text-water/65 mt-3 leading-relaxed">
            {stats.percent === 100
              ? "Everything in this week is done. Nice work."
              : `${stats.total - stats.done} items left in this week.`}
          </p>
        </div>
      </header>

      <div className="space-y-9">
        <ModuleLessons module={module} />
        <ModuleQuizzes moduleId={module.id} />
        {hasVideos ? <ModuleVideos moduleId={module.id} /> : null}
        <ModuleResources moduleId={module.id} />
      </div>
    </div>
  );
}
