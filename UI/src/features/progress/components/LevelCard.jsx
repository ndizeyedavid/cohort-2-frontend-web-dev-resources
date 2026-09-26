import BubbleMeter from "../../../ui/BubbleMeter.jsx";

export default function LevelCard({ level, xp }) {
  const next = level.next;

  return (
    <div className="card sky-panel overflow-hidden relative">
      <span className="absolute top-0 inset-x-0 h-1.5 bg-sun" aria-hidden="true" />
      <div className="p-4 flex flex-col justify-between h-full relative">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
              Level {level.level}
            </span>
            <span className="font-mono text-[11px] text-white/80 tabular-nums">{xp} xp</span>
          </div>
          <p className="font-display text-xl font-bold mt-1.5">{level.name}</p>
        </div>
        <div className="mt-4">
          <BubbleMeter value={level.progress * 100} count={7} size={19} />
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/75 mt-2.5">
            {next ? `${next.xp - xp} xp to ${next.name}` : "Top level reached"}
          </p>
        </div>
      </div>
    </div>
  );
}
