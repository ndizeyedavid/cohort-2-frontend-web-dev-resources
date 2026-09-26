import { Link } from "react-router-dom";
import { modules } from "../../../services/catalog.js";
import { moduleStats } from "../../../services/progress.js";
import ProgressBar from "../../../ui/ProgressBar.jsx";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import Icon from "../../../ui/Icon.jsx";

export default function ModuleProgressList({ state }) {
  return (
    <section>
      <SectionHeading icon="grid" eyebrow="Course">
        By module
      </SectionHeading>
      <div className="card glass overflow-hidden divide-y divide-base-300/70">
        {modules.map((module) => {
          const stats = moduleStats(module, state);
          return (
            <Link
              key={module.id}
              to={`/modules/${module.id}`}
              className="flex items-center gap-4 px-4 py-3.5 hover:bg-sky-soft transition-colors"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-white rounded-pill px-2 py-1 shrink-0"
                style={{
                  backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
                }}
              >
                {String(module.week).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-water truncate">{module.title}</p>
                <ProgressBar value={stats.percent} size="xs" className="mt-2" />
              </div>
              <span className="font-mono text-[11px] text-water/55 tabular-nums shrink-0">
                {stats.done}/{stats.total}
              </span>
              <Icon name="arrowRight" size={16} className="text-water/30 shrink-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
