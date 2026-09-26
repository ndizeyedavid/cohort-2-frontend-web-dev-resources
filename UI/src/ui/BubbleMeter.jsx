const DEFAULT_BUBBLES = 7;

function toneFill(index, filled) {
  if (!filled) return "linear-gradient(160deg, #eaf6fd 0%, #c6e2f3 100%)";
  return "linear-gradient(160deg, #7fe3f0 0%, #12b8c4 55%, #0f8ec9 100%)";
}

/**
 * Progress as a rising cluster of bubbles. The house progress metaphor: light
 * refraction on a sphere, filling with water as work gets done.
 */
export default function BubbleMeter({
  value = 0,
  count = DEFAULT_BUBBLES,
  size = 20,
  label,
  className = "",
}) {
  const pct = Math.max(0, Math.min(100, value));
  const filled = Math.round((pct / 100) * count);

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || "Progress"}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="sphere transition-all duration-500"
          style={{
            width: size,
            height: size,
            backgroundImage: toneFill(index, index < filled),
            border: index < filled ? "1px solid rgba(255,255,255,0.85)" : "1px solid #a9cfe4",
            boxShadow:
              index < filled
                ? "inset 0 2px 4px rgba(255,255,255,0.9), 0 4px 10px -4px rgba(18,184,196,0.8)"
                : "inset 0 2px 3px rgba(255,255,255,0.9), 0 2px 6px -3px rgba(10,74,107,0.35)",
            transform: index < filled ? "scale(1.08)" : "scale(0.94)",
          }}
        />
      ))}
      {label ? <span className="ml-1.5 font-mono text-[11px] tabular-nums">{label}</span> : null}
    </div>
  );
}
