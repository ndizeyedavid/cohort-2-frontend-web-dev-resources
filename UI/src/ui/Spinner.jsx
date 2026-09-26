export default function Spinner({ label = "Loading", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-sm text-water/60 ${className}`}>
      <span className="loading loading-spinner loading-sm text-primary" />
      {label}
    </span>
  );
}
