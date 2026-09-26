import Icon from "../../../ui/Icon.jsx";

export default function TutorComposer({ draft, onDraftChange, busy, onSubmit }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
      className="border-t border-base-300 p-3 flex gap-2 bg-sky-soft/50"
    >
      <input
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Ask the tutor..."
        aria-label="Message the tutor"
        className="input input-sm flex-1 rounded-pill bg-white border-base-300 text-sm text-water placeholder:text-water/40 focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        disabled={busy || !draft.trim()}
        className="btn btn-circle btn-sm border-0 text-white disabled:opacity-50"
        style={{
          backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
          boxShadow: "0 8px 18px -9px rgba(15,142,201,0.95)",
        }}
        aria-label="Send message"
      >
        <Icon name="send" size={16} />
      </button>
    </form>
  );
}
