import Icon from "../../../ui/Icon.jsx";

const TYPE_ICONS = {
  lesson: "book",
  module: "grid",
  quiz: "sparkle",
  video: "play",
  link: "link",
  icebreaker: "users",
};

const TYPE_LABELS = {
  lesson: "Lesson",
  module: "Module",
  quiz: "Quiz",
  video: "Video",
  link: "Link",
  icebreaker: "Deck",
};

export default function SearchResultList({ results, active = -1, onHover, onSelect }) {
  return (
    <ul className="py-2">
      {results.map((item, index) => (
        <li key={`${item.type}:${item.id}`}>
          <button
            type="button"
            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
              index === active ? "bg-sky-soft" : "hover:bg-sky-soft/60"
            }`}
            onMouseEnter={() => onHover?.(index)}
            onMouseDown={(event) => {
              event.preventDefault();
              onSelect?.(item);
            }}
          >
            <Icon
              name={TYPE_ICONS[item.type] || "grid"}
              size={16}
              className={index === active ? "text-primary" : "text-water/45"}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-water truncate">
                {item.title}
              </span>
              {item.subtitle ? (
                <span className="block text-xs text-water/55 truncate">{item.subtitle}</span>
              ) : null}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-water/40 shrink-0">
              {TYPE_LABELS[item.type] || item.type}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
