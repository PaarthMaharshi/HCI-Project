import { forwardRef, useMemo, useState } from "react";
import { SECTIONS } from "../data/profile.js";
import { highlightParts, search } from "../lib/search.js";
import { SearchIcon } from "./Icons.jsx";

const sectionLabel = (id) => SECTIONS.find((s) => s.id === id)?.label ?? "Setting";

function Hl({ text, query }) {
  return highlightParts(text, query).map((p, i) => (p.hit ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>));
}

// ARIA 1.2 combobox: input keeps focus, aria-activedescendant points at the option.
export const SearchBox = forwardRef(function SearchBox({ index, onSelect }, inputRef) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(index, query), [index, query]);
  const showList = open && query.trim().length > 0;

  const choose = (entry) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    onSelect(entry);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      if (showList && results[active]) {
        e.preventDefault();
        choose(results[active]);
      }
    } else if (e.key === "Escape") {
      if (query) setQuery("");
      else inputRef.current?.blur();
      setOpen(false);
    }
  };

  return (
    <div className="search" role="search">
      <label htmlFor="site-search" className="visually-hidden">
        Search the profile
      </label>
      <SearchIcon className="icon search-icon" />
      <input
        ref={inputRef}
        id="site-search"
        className="search-input"
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls="search-results"
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `opt-${results[active].key}` : undefined}
        autoComplete="off"
        placeholder="Search projects, skills, marks…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() =>
          setTimeout(() => {
            // Only close if focus really left (a quick "/" refocus must keep it open).
            if (document.activeElement !== inputRef.current) setOpen(false);
          }, 150)
        }
        onKeyDown={onKeyDown}
      />
      {!query && <kbd aria-hidden="true">/</kbd>}
      {showList && (
        <ul id="search-results" role="listbox" aria-label="Search results" className="search-results">
          {results.length === 0 ? (
            <li className="search-empty" role="option" aria-selected="false" aria-disabled="true">
              No results for “{query}”. Try “React”, “internship” or “Class 12”.
            </li>
          ) : (
            results.map((r, i) => (
              <li
                key={r.key}
                id={`opt-${r.key}`}
                role="option"
                aria-selected={i === active}
                className="search-option"
                data-section={r.section}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(r)}
              >
                <span className="opt-title">
                  <Hl text={r.title} query={query} />
                </span>
                <span className="opt-meta">
                  {sectionLabel(r.section)} · <Hl text={r.meta ?? ""} query={query} />
                </span>
              </li>
            ))
          )}
        </ul>
      )}
      <div className="visually-hidden" aria-live="polite">
        {showList ? `${results.length} result${results.length === 1 ? "" : "s"}` : ""}
      </div>
    </div>
  );
});
