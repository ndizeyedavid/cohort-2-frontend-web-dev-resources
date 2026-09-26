import Icon from "../../../ui/Icon.jsx";

function Chip({ onClick, title, children, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`grid place-items-center size-8 sphere transition-all ${
        active
          ? "bg-accent text-accent-content shadow-[0_6px_14px_-8px_rgba(255,196,46,0.95)]"
          : "bg-white/15 text-white/85 hover:bg-white/30"
      }`}
    >
      {children}
    </button>
  );
}

export default function TutorHeader({ voiceOn, onToggleVoice, onClear, onClose }) {
  return (
    <header className="sky-panel px-4 py-3 flex items-center gap-2.5">
      <span className="grid place-items-center size-9 sphere bg-white/20 text-white shrink-0 border border-white/40">
        <Icon name="sparkle" size={17} />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-display font-bold text-[15px]">AI Tutor</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 truncate">
          Sees the page you are on
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <Chip onClick={onToggleVoice} title="Toggle voice" active={voiceOn}>
          <Icon name="mic" size={15} />
        </Chip>
        <Chip onClick={onClear} title="Clear conversation">
          <Icon name="undo" size={15} />
        </Chip>
        <button
          type="button"
          onClick={onClose}
          className="grid place-items-center size-8 sphere text-white/85 hover:bg-white/20 transition-colors"
          aria-label="Close tutor"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </header>
  );
}
