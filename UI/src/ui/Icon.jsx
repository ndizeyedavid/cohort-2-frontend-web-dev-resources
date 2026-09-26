import { ICON_PATHS } from "../lib/icons.js";

export default function Icon({ name, size = 18, className = "", strokeWidth = 1.7 }) {
  const d = ICON_PATHS[name];
  if (!d) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
