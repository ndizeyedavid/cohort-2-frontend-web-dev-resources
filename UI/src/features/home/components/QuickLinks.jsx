import { Link } from "react-router-dom";
import { icebreakers, quizzes, videos } from "../../../services/catalog.js";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import Icon from "../../../ui/Icon.jsx";

export default function QuickLinks() {
  const { state } = useVault();
  const passed = Object.values(state.progress.quizAttempts).filter(
    (attempt) => attempt.count > 0,
  ).length;

  const tiles = [
    { to: "/quizzes", icon: "sparkle", label: "Quizzes", value: `${passed}/${quizzes.length}`, hint: "practice sets attempted" },
    { to: "/videos", icon: "play", label: "Videos", value: videos.length, hint: "recorded walkthroughs" },
    { to: "/icebreakers", icon: "users", label: "Icebreakers", value: icebreakers.length, hint: "class warm ups" },
    { to: "/progress", icon: "trophy", label: "Progress", value: state.gamification.badges.length, hint: "badges earned" },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {tiles.map((tile) => (
        <Link
          key={tile.to}
          to={tile.to}
          className="card glass glass-hover group"
        >
          <div className="flex items-center gap-3.5 p-4">
            <span
              className="grid place-items-center size-11 sphere border-2 border-white text-white shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{
                backgroundImage: "linear-gradient(160deg, #8fdef5 0%, #2ea9d6 60%, #0f8ec9 100%)",
                boxShadow: "0 8px 18px -8px rgba(46,169,214,0.95)",
              }}
            >
              <Icon name={tile.icon} size={19} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-bold text-water group-hover:text-primary transition-colors">
                {tile.label}
              </span>
              <span className="block font-mono text-[11px] text-water/55 tabular-nums truncate">
                {tile.value}
                <span className="hidden sm:inline"> {tile.hint}</span>
              </span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
