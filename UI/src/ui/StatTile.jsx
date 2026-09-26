export default function StatTile({ label, value, sub, tone = "primary", children }) {
  const accents = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-[#e0a800]",
    neutral: "text-water",
  };

  return (
    <div className="card glass p-4">
      <div className="eyebrow">{label}</div>
      <div className={`font-display text-3xl font-bold mt-1.5 tabular-nums ${accents[tone]}`}>
        {value}
      </div>
      {sub ? <div className="text-[13px] text-water/65 mt-0.5">{sub}</div> : null}
      {children}
    </div>
  );
}
