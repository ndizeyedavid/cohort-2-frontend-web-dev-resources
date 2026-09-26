import { useEffect, useState } from "react";

function findHeading(anchor) {
  const headings = document.querySelectorAll(
    ".markdown h1, .markdown h2, .markdown h3, .markdown h4",
  );
  const wanted = anchor.trim().toLowerCase();
  return Array.from(headings).find((heading) => {
    const text = heading.textContent.trim().toLowerCase();
    return text.includes(wanted) || wanted.includes(text);
  });
}

function PointerBody({ pointer }) {
  const [view, setView] = useState(null);

  useEffect(() => {
    const target = findHeading(pointer.anchor);
    let scrollTimer;
    let hideTimer;

    if (!target) {
      scrollTimer = setTimeout(() => {
        setView({ type: "missing", anchor: pointer.anchor });
      }, 0);
      hideTimer = setTimeout(() => setView(null), 5000);
      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(hideTimer);
      };
    }

    target.scrollIntoView({ block: "center", behavior: "smooth" });
    scrollTimer = setTimeout(() => {
      const rect = target.getBoundingClientRect();
      target.style.outline = "2px solid #12b8c4";
      target.style.outlineOffset = "4px";
      setView({ type: "pointer", x: rect.left + 6, y: rect.top - 6 });
      hideTimer = setTimeout(() => {
        setView(null);
        target.style.outline = "";
        target.style.outlineOffset = "";
      }, 9000);
    }, 450);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(hideTimer);
      target.style.outline = "";
      target.style.outlineOffset = "";
    };
  }, [pointer]);

  if (!view) return null;

  if (view.type === "missing") {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 text-white font-mono text-[12px] px-4 py-2.5 rounded-pill max-w-xs text-center" style={{ backgroundImage: "linear-gradient(160deg, #0d5b83 0%, #062f47 100%)" }}>
        Could not find &quot;{view.anchor}&quot; on this page.
      </div>
    );
  }

  return (
    <div
      className="fixed z-40 pointer-events-none -translate-x-1/2"
      style={{ left: view.x, top: view.y }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-white font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-pill whitespace-nowrap"
          style={{
            backgroundImage: "linear-gradient(160deg, #a8ecd8 0%, #12b8c4 100%)",
            boxShadow: "0 8px 18px -8px rgba(18,184,196,0.95)",
          }}
        >
          Look here
        </span>
        <span
          className="block size-2.5 rotate-45 -mt-2"
          style={{ backgroundImage: "linear-gradient(160deg, #a8ecd8 0%, #12b8c4 100%)" }}
        />
      </div>
    </div>
  );
}

export default function TutorPointer({ pointer }) {
  if (!pointer) return null;
  return <PointerBody key={pointer.id} pointer={pointer} />;
}
