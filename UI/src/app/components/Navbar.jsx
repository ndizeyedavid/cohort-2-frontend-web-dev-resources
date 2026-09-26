import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBox from "../../features/search/components/SearchBox.jsx";
import StreakChip from "../../ui/StreakChip.jsx";
import Button from "../../ui/Button.jsx";
import Icon from "../../ui/Icon.jsx";
import { useVault } from "../providers/VaultProvider.jsx";
import { useTutor } from "../providers/TutorProvider.jsx";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/modules", label: "Modules" },
  { to: "/icebreakers", label: "Icebreakers" },
  { to: "/videos", label: "Videos" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/progress", label: "Progress" },
];

function linkClass({ isActive }) {
  return `px-3.5 py-2 text-[13.5px] font-bold rounded-pill transition-all ${
    isActive
      ? "text-white"
      : "text-water/70 hover:text-primary hover:bg-white/70"
  }`;
}

function linkStyle({ isActive }) {
  return isActive
    ? {
        backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
        boxShadow: "0 8px 18px -9px rgba(15,142,201,1)",
      }
    : undefined;
}

export default function Navbar() {
  const { state } = useVault();
  const { openTutor } = useTutor();
  const [menuOpen, setMenuOpen] = useState(false);
  const streak = state.gamification.streak;

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-white/80 backdrop-blur-md border-b border-white/70 shadow-[0_2px_14px_-8px_rgba(10,74,107,0.5)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 h-16">
            <Link to="/" className="flex items-center gap-2.5 mr-1 shrink-0 group">
              <img
                src="/logo.png"
                alt="ALU"
                width={36}
                height={36}
                className="size-9 rounded-tile border-2 border-white shadow-[0_6px_14px_-8px_rgba(10,74,107,0.9)]"
              />
              <span className="leading-none">
                <span className="block font-display text-[16px] font-bold text-water group-hover:text-primary transition-colors">
                  Cohort Vault
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-water/50">
                  cohort 2
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center ml-4 gap-0.5">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={linkClass}
                  style={linkStyle}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-1" />

            <div className="hidden md:block">
              <SearchBox />
            </div>

            <StreakChip days={streak} className="hidden lg:inline-flex" />

            <Button
              size="sm"
              onClick={openTutor}
              className="shrink-0 hidden sm:inline-flex"
            >
              <Icon name="sparkle" size={15} />
              Ask Tutor
            </Button>

            <button
              type="button"
              className="btn btn-circle btn-ghost btn-sm text-water lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>

          {menuOpen ? (
            <nav className="lg:hidden pb-4 flex flex-col gap-1 border-t border-base-300 pt-3">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={`px-4 py-2.5 text-sm font-bold rounded-tile transition-colors ${
                    linkClass({ isActive: false })
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 mt-3">
                <StreakChip days={streak} className="lg:hidden" />
              </div>
              <div className="flex items-center gap-2 mt-2 md:hidden">
                <SearchBox />
              </div>
              <Button size="sm" onClick={openTutor} className="sm:hidden self-start mt-2">
                <Icon name="sparkle" size={15} />
                Ask Tutor
              </Button>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
