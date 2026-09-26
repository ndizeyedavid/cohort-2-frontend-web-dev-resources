import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../../../services/search.js";
import Icon from "../../../ui/Icon.jsx";
import SearchResultList from "./SearchResultList.jsx";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const results = query.trim() ? search(query, 10) : [];

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        setQuery("");
        setActive(0);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function go(item) {
    setOpen(false);
    setQuery("");
    navigate(item.route);
  }

  function onKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-water-deep/45 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="card glass w-full max-w-xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 border-b border-base-300">
          <Icon name="search" size={18} className="text-water/45" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search lessons, quizzes, videos, links..."
            aria-label="Search everything"
            className="flex-1 py-4 text-[15px] outline-none bg-transparent text-water placeholder:text-water/40"
          />
        </div>
        {results.length ? (
          <SearchResultList
            results={results}
            active={active}
            onHover={setActive}
            onSelect={go}
          />
        ) : (
          <p className="px-5 py-10 text-sm text-water/55 text-center">
            {query.trim() ? "Nothing matched that." : "Type to search the whole vault."}
          </p>
        )}
        <div className="px-5 py-3 border-t border-base-300 bg-sky-soft/60 font-mono text-[10px] uppercase tracking-[0.12em] text-water/45 flex gap-4">
          <span>up down move</span>
          <span>enter open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
