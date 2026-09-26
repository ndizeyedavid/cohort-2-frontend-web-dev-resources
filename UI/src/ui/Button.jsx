const VARIANTS = {
  primary:
    "[--btn-color:var(--color-primary)] [--btn-fg-color:#fff] hover:[--btn-color:#0b8ac4] [--btn-shadow:0_8px_18px_-8px_rgba(15,159,224,0.9)]",
  secondary:
    "[--btn-color:var(--color-secondary)] [--btn-fg-color:#fff] hover:[--btn-color:#37a441] [--btn-shadow:0_8px_18px_-8px_rgba(63,181,74,0.9)]",
  accent:
    "[--btn-color:var(--color-accent)] [--btn-fg-color:var(--color-accent-content)] hover:[--btn-color:#ffb91c] [--btn-shadow:0_8px_18px_-8px_rgba(255,196,46,0.95)]",
  neutral:
    "[--btn-color:var(--color-water)] [--btn-fg-color:#fff] hover:[--btn-color:#062f47] [--btn-shadow:0_8px_18px_-8px_rgba(10,74,107,0.9)]",
  glass:
    "[--btn-color:#fff] [--btn-fg-color:var(--color-water)] [--btn-shadow:0_6px_16px_-10px_rgba(10,74,107,0.6)] hover:[--btn-color:#f2fbff] [--btn-border:1px] [--btn-border-color:var(--color-base-300)]",
  ghost:
    "[--btn-color:transparent] [--btn-fg-color:var(--color-water)] [--btn-shadow:none] hover:[--btn-color:rgba(255,255,255,0.7)] [--btn-border:0px]",
};

/* Sizes come from daisyUI so the height is authoritative in its own layer. */
const SIZES = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn rounded-pill font-bold sheen ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
