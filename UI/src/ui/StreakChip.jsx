import BadgeChip from "./BadgeChip.jsx";
import Icon from "./Icon.jsx";

export default function StreakChip({ days, className = "" }) {
  if (!days) return null;
  return (
    <BadgeChip tone="accent" className={`gap-1.5 whitespace-nowrap ${className}`}>
      <Icon name="fire" size={13} />
      <span className="tabular-nums">{days}</span>
      <span className="font-semibold opacity-80">day streak</span>
    </BadgeChip>
  );
}
