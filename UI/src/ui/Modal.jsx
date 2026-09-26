import Icon from "./Icon.jsx";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-water-deep/45 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="card glass w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col !rounded-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-base-300">
          <h3 className="font-display font-bold text-water text-lg">{title}</h3>
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-sm text-water/60 hover:text-water"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
