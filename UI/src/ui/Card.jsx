export default function Card({ interactive = false, className = "", children, ...props }) {
  return (
    <div
      className={`card glass ${interactive ? "glass-hover" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
