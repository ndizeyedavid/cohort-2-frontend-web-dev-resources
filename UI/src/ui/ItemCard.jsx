import Icon from "./Icon.jsx";
import Mark from "./Mark.jsx";
import { hasIcon } from "../lib/icons.js";

function Glyph({ icon, done }) {
  if (!icon) return null;

  if (hasIcon(icon)) {
    return (
      <span
        className={`grid place-items-center size-10 sphere border-2 border-white shrink-0 ${
          done ? "text-white" : "text-white"
        }`}
        style={{
          backgroundImage: done
            ? "linear-gradient(160deg, #6fd46f 0%, #3fb54a 60%, #2f9c3a 100%)"
            : "linear-gradient(160deg, #8fdef5 0%, #2ea9d6 60%, #0f8ec9 100%)",
          boxShadow: done
            ? "0 8px 18px -8px rgba(63,181,74,0.95)"
            : "0 8px 18px -8px rgba(46,169,214,0.95)",
        }}
      >
        <Icon name={icon} size={18} />
      </span>
    );
  }

  return (
    <span
      className="grid place-items-center size-10 sphere border-2 border-white text-[17px] text-white shrink-0"
      style={{
        backgroundImage: done
          ? "linear-gradient(160deg, #6fd46f 0%, #3fb54a 60%, #2f9c3a 100%)"
          : "linear-gradient(160deg, #8fdef5 0%, #2ea9d6 60%, #0f8ec9 100%)",
      }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}

export default function ItemCard({
  icon,
  title,
  description,
  meta,
  badge,
  action,
  done = false,
  className = "",
}) {
  return (
    <div className={`card glass glass-hover ${className}`}>
      <div className="flex items-start gap-4 p-4">
        <Glyph icon={icon} done={done} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-[15px] leading-snug text-water">
              {done ? <Mark>{title}</Mark> : title}
            </h4>
            {badge}
          </div>
          {description ? (
            <p className="text-sm text-water/65 mt-1 leading-relaxed">{description}</p>
          ) : null}
          {meta ? (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-water/45 mt-2.5">
              {meta}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0 self-center">{action}</div> : null}
      </div>
    </div>
  );
}
