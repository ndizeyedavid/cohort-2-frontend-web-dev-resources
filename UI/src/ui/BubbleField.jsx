const BUBBLES = [
  { size: 74, left: "6%", dur: 15, delay: 0 },
  { size: 40, left: "18%", dur: 19, delay: 3.5 },
  { size: 108, left: "33%", dur: 22, delay: 1.5 },
  { size: 30, left: "52%", dur: 17, delay: 6 },
  { size: 88, left: "66%", dur: 20, delay: 2.5 },
  { size: 46, left: "78%", dur: 16, delay: 8 },
  { size: 62, left: "90%", dur: 21, delay: 5 },
  { size: 34, left: "44%", dur: 14, delay: 10 },
];

/** Decorative water layer. Sits behind content, never interactive. */
export default function BubbleField({ className = "" }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: "-140px",
            animationDuration: `${bubble.dur}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
