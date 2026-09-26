import { modules } from "../../../services/catalog.js";
import { itemState, keys } from "../../../services/progress.js";
import { levelFor } from "../../../services/gamification.js";
import { formatDate } from "../../../lib/format.js";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import Icon from "../../../ui/Icon.jsx";
import BubbleMeter from "../../../ui/BubbleMeter.jsx";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function counts(state) {
  let total = 0;
  let done = 0;
  for (const module of modules) {
    for (const lesson of module.lessons || []) {
      total += 1;
      if (itemState(state, keys.lesson(module.id, lesson.id)) === "completed") done += 1;
    }
  }
  return { total, done };
}

function Facts({ state, lessons }) {
  const facts = [
    { icon: "fire", value: state.gamification.streak, label: "day streak" },
    { icon: "check", value: `${lessons.done}/${lessons.total}`, label: "lessons" },
    { icon: "sparkle", value: state.gamification.badges.length, label: "badges" },
  ];

  return (
    <dl className="flex gap-5 sm:gap-7">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 flex items-center gap-1.5">
            <Icon name={fact.icon} size={12} />
            {fact.label}
          </dt>
          <dd className="font-display text-2xl font-bold mt-1 tabular-nums text-white">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Hero() {
  const { state } = useVault();
  const level = levelFor(state.gamification.xp);
  const lessons = counts(state);
  const nextLabel = level.next
    ? `${state.gamification.xp} of ${level.next.xp} xp to ${level.next.name}`
    : `${state.gamification.xp} xp, top level reached`;

  return (
    <section className="sky-panel overflow-hidden relative">
      <span
        className="absolute -top-20 -left-12 size-72 sphere pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative px-5 sm:px-8 py-7 sm:py-9">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-tile border-2 border-white/70 bob"
              />
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/80">
                Cohort 2 · {formatDate(new Date().toISOString())}
              </p>
            </div>
            <h1 className="font-display text-[32px] sm:text-[38px] font-bold leading-[1.08] mt-3.5">
              {greeting()}, keep going.
            </h1>
            <p className="text-white/85 text-[15px] mt-2.5">
              Level {level.level},{" "}
              <span className="font-bold text-white">{level.name}</span>
            </p>
            <div className="mt-5 max-w-sm">
              <BubbleMeter value={level.progress * 100} count={8} size={19} label={nextLabel} />
            </div>
          </div>
          <Facts state={state} lessons={lessons} />
        </div>
      </div>
    </section>
  );
}
