const TONES = {
  primary: "",
  secondary: "progress-grass",
  accent: "progress-sun",
  aqua: "progress-aqua",
};

const HEIGHTS = { xs: 6, sm: 8, md: 10 };

export default function ProgressBar({
  value = 0,
  showLabel = false,
  size = "md",
  tone = "primary",
  className = "",
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-1">
        <progress
          className={`progress ${TONES[tone]}`}
          style={{ height: `${HEIGHTS[size]}px` }}
          value={clamped}
          max="100"
        />
      </div>
      {showLabel ? (
        <span className="font-mono text-[11px] font-medium text-water/60 tabular-nums">
          {clamped}%
        </span>
      ) : null}
    </div>
  );
}
