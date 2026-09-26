const TONES = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  neutral: "badge-neutral",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  glass: "badge-ghost",
};

const SIZES = {
  xs: "badge-xs",
  sm: "badge-sm",
  md: "badge-md",
  lg: "badge-lg",
};

export default function BadgeChip({ tone = "primary", size = "sm", className = "", children }) {
  return (
    <span className={`badge rounded-pill border-0 font-bold ${SIZES[size]} ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
