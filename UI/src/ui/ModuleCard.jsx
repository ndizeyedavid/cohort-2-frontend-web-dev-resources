import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import Mark from "./Mark.jsx";
import BubbleMeter from "./BubbleMeter.jsx";

export default function ModuleCard({ module, stats }) {
  const complete = stats.total > 0 && stats.percent === 100;

  return (
    <Link
      to={`/modules/${module.id}`}
      className="card glass glass-hover group overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span
            className="badge h-7 rounded-pill border-0 px-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            style={{
              backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
              boxShadow: "0 6px 14px -8px rgba(15,142,201,0.95)",
            }}
          >
            Week {String(module.week).padStart(2, "0")}
          </span>
          {complete ? (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-secondary">
              <Icon name="check" size={15} strokeWidth={2.6} />
              Complete
            </span>
          ) : (
            <span className="font-mono text-[11px] text-water/50 tabular-nums">
              {stats.done}/{stats.total} items
            </span>
          )}
        </div>

        <h3 className="font-display text-[18px] font-bold mt-3.5 leading-snug text-water group-hover:text-primary transition-colors">
          {complete ? <Mark tone="grass">{module.title}</Mark> : module.title}
        </h3>
        <p className="text-sm text-water/65 mt-1.5 leading-relaxed line-clamp-2">
          {module.summary}
        </p>

        <div className="flex items-center justify-between gap-3 mt-5">
          <BubbleMeter value={stats.percent} count={6} size={17} />
          <span className="font-mono text-[11px] font-medium text-water/55 tabular-nums">
            {stats.percent}%
          </span>
        </div>
      </div>
    </Link>
  );
}
