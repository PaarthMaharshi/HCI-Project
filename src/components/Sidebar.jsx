import { forwardRef, useEffect, useRef, useState } from "react";
import { LAB, SECTIONS, profile } from "../data/profile.js";
import { DESKTOP, useMediaQuery } from "../hooks/useMediaQuery.js";
import { usePrefs } from "../hooks/usePrefs.js";
import { useScrollProgress } from "../hooks/useScrollProgress.js";
import { Annotation } from "./Annotation.jsx";
import { InfoIcon, KeyboardIcon, MoonIcon, SunIcon, TextIcon } from "./Icons.jsx";
import { Shiny } from "./Motion.jsx";
import { SearchBox } from "./SearchBox.jsx";

export function TextSizeButton() {
  const p = usePrefs();
  return (
    <button id="ctl-text-size" type="button" className="tool-btn toggle" aria-pressed={p.largeText} onClick={p.toggleLargeText}>
      <TextIcon />
      <span className="tool-label">Larger text</span>
    </button>
  );
}

// Settings. The text-size button can be left out where it is shown elsewhere (phone top bar).
export function Tools({ textSize = true }) {
  const p = usePrefs();
  return (
    <div className="tools">
      {textSize && (
        <>
          <TextSizeButton />
          <Annotation id="textSize" />
        </>
      )}
      <button
        id="ctl-theme"
        type="button"
        className="tool-btn"
        onClick={p.toggleTheme}
        aria-label={p.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {p.theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span className="tool-label" aria-hidden="true">{p.theme === "dark" ? "Light theme" : "Dark theme"}</span>
      </button>
      <Annotation id="theme" />
      <button id="ctl-annotations" type="button" className="tool-btn toggle" aria-pressed={p.annotations} onClick={p.toggleAnnotations}>
        <InfoIcon />
        <span className="tool-label">HCI notes</span>
        <span className="visually-hidden"> (show labels for design principles)</span>
      </button>
      <Annotation id="annotations" />
    </div>
  );
}

function Identity({ onNav }) {
  const b = profile.basics;
  return (
    <div className="side-id">
      <a className="side-avatar" href="#overview" onClick={(e) => { e.preventDefault(); onNav("overview"); }}>
        <span aria-hidden="true">{b.initials}</span>
        <span className="visually-hidden">{b.name}, back to top</span>
      </a>
      <div>
        <p className="side-name">{b.name}</p>
        <p className="side-tagline">{b.tagline}</p>
      </div>
      <p className="side-status">
        <span className="status-dot" aria-hidden="true" />
        <Shiny>{b.availability}</Shiny>
      </p>
    </div>
  );
}

// Numbered section list with scroll-spy and a progress rail.
function NavList({ active, onNav }) {
  const progress = useScrollProgress();
  return (
    <nav className="side-nav" aria-label="Sections">
      <div className="side-rail" aria-hidden="true">
        <span className="side-rail-fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
      <ul>
        {SECTIONS.map((s) => (
          <li key={s.id} data-section={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); onNav(s.id); }}>
              <span className="side-num" aria-hidden="true">{s.key.padStart(2, "0")}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <Annotation id="tabs" />
    </nav>
  );
}

function SideLinks({ onHelp }) {
  return (
    <div className="side-links">
      <button type="button" className="side-link" onClick={onHelp}>
        <KeyboardIcon /> Shortcuts <kbd aria-hidden="true">?</kbd>
      </button>
      <a className="side-link" href={`#${LAB.id}`}>
        {LAB.label} <kbd aria-hidden="true">{LAB.key}</kbd>
      </a>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

// Phone/tablet: slim top bar + the sidebar contents in a left drawer (<dialog>).
function MobileBar({ index, onSelect, active, onNav, onHelp, searchRef }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    const d = dialogRef.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const navAndClose = (id, opts) => {
    setOpen(false);
    onNav(id, opts);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-row">
          <button type="button" className="tool-btn" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
            <MenuIcon />
            <span className="tool-label">Menu</span>
          </button>
          <a className="topbar-brand" href="#overview" onClick={(e) => { e.preventDefault(); onNav("overview"); }}>
            <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
            {profile.basics.name}
          </a>
          <TextSizeButton />
        </div>
        <SearchBox ref={searchRef} index={index} onSelect={onSelect} />
      </header>
      <dialog ref={dialogRef} className="drawer" aria-label="Menu" onClose={() => setOpen(false)} onClick={(e) => { if (e.target === dialogRef.current) setOpen(false); }}>
        <div className="drawer-inner">
          <button type="button" className="tool-btn drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          <Identity onNav={navAndClose} />
          <NavList active={active} onNav={navAndClose} />
          <div className="side-bottom">
            <Tools textSize={false} />
            <SideLinks onHelp={() => { setOpen(false); onHelp(); }} />
          </div>
        </div>
      </dialog>
    </>
  );
}

export const Sidebar = forwardRef(function Sidebar({ index, onSelect, active, onNav, onHelp }, searchRef) {
  const desktop = useMediaQuery(DESKTOP);
  if (!desktop) return <MobileBar index={index} onSelect={onSelect} active={active} onNav={onNav} onHelp={onHelp} searchRef={searchRef} />;
  return (
    <aside className="sidebar" aria-label="Profile navigation">
      <div className="side-glow" aria-hidden="true" />
      <Identity onNav={onNav} />
      <div className="side-search">
        <SearchBox ref={searchRef} index={index} onSelect={onSelect} placeholder="Search everything" />
        <Annotation id="search" />
      </div>
      <NavList active={active} onNav={onNav} />
      <div className="side-bottom">
        <Tools />
        <SideLinks onHelp={onHelp} />
      </div>
      <Annotation id="sidebar" />
    </aside>
  );
});
