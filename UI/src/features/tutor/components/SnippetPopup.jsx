import Icon from "../../../ui/Icon.jsx";

export default function SnippetPopup({ snippet, onClose }) {
  if (!snippet) return null;

  return (
    <div
      className="fixed left-4 bottom-4 z-40 w-[340px] max-w-[calc(100vw-2rem)] rounded-inner overflow-hidden border border-white/20"
      style={{
        backgroundImage: "linear-gradient(180deg, #0d5b83 0%, #062f47 100%)",
        boxShadow: "0 20px 46px -14px rgba(0,0,0,0.65)",
      }}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-white/15">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/75 truncate">
          {snippet.title}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid place-items-center size-6 sphere text-white/70 hover:text-white hover:bg-white/15 transition-colors"
          aria-label="Close snippet"
        >
          <Icon name="close" size={14} />
        </button>
      </div>
      <pre className="px-4 py-3.5 text-[12.5px] leading-relaxed overflow-x-auto max-h-60 font-mono text-[#e6e6e3]">
        {snippet.code}
      </pre>
      <p className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/45 border-t border-white/15">
        Shown by your AI tutor
      </p>
    </div>
  );
}
