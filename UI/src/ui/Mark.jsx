export default function Mark({ as: Tag = "span", tone = "sun", children, className = "" }) {
  return (
    <Tag className={`relative inline-block ${className}`}>
      <span
        aria-hidden="true"
        className="absolute left-[-0.14em] right-[-0.14em] top-[0.08em] bottom-[0.14em] rounded-pill -z-10"
        style={{
          backgroundImage:
            tone === "grass"
              ? "linear-gradient(90deg, #c9f0c4 0%, #a5e69c 100%)"
              : "linear-gradient(90deg, #ffe9a8 0%, #ffd76b 100%)",
          transform: "skewY(-0.6deg)",
        }}
      />
      {children}
    </Tag>
  );
}
