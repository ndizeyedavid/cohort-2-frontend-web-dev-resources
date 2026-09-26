import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../../../services/search.js";
import Icon from "../../../ui/Icon.jsx";
import SearchResultList from "./SearchResultList.jsx";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const results = query.trim() ? search(query, 6) : [];

  function go(item) {
    setQuery("");
    setActive(0);
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
    } else if (event.key === "Escape") {
      setQuery("");
      event.currentTarget.blur();
    }
  }

  function onBlur() {
    timerRef.current = setTimeout(() => setQuery(""), 150);
  }

  function onFocus() {
    clearTimeout(timerRef.current);
  }

  return (
    <div className="relative">
      <Icon
        name="search"
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-water/45 pointer-events-none z-10"
      />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Search lessons"
        aria-label="Search the vault"
        className="input input-sm w-44 lg:w-64 rounded-pill bg-white/80 border-base-300 pl-10 pr-14 text-[13px] text-water placeholder:text-water/40 focus:border-primary focus:outline-none"
      />
      <kbd className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 items-center font-mono text-[10px] text-water/45 border border-base-300 rounded-pill px-2 py-0.5 bg-white/80">
        ctrl k
      </kbd>
      {results.length ? (
        <div className="absolute right-0 top-full mt-2 w-96 card glass overflow-hidden z-50 shadow-[0_18px_44px_-16px_rgba(10,74,107,0.7)]">
          <SearchResultList
            results={results}
            active={active}
            onHover={setActive}
            onSelect={go}
          />
        </div>
      ) : null}
    </div>
  );
}
