import { forwardRef } from "react";
import { SECTIONS, profile } from "../data/profile.js";
import { usePrefs } from "../hooks/usePrefs.js";
import { Annotation } from "./Annotation.jsx";
import { InfoIcon, MoonIcon, SunIcon, TextIcon } from "./Icons.jsx";
import { SearchBox } from "./SearchBox.jsx";

function Tools() {
  const p = usePrefs();
  return (
    <div className="header-tools">
      <button id="ctl-text-size" type="button" className="btn toggle" aria-pressed={p.largeText} onClick={p.toggleLargeText}>
        <TextIcon />
        <span className="tool-label">Larger text</span>
      </button>
      <Annotation id="textSize" />
      <button
        id="ctl-theme"
        type="button"
        className="btn"
        onClick={p.toggleTheme}
        aria-label={p.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {p.theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span className="tool-label" aria-hidden="true">{p.theme === "dark" ? "Light" : "Dark"}</span>
      </button>
      <Annotation id="theme" />
      <button id="ctl-annotations" type="button" className="btn toggle" aria-pressed={p.annotations} onClick={p.toggleAnnotations}>
        <InfoIcon />
        <span className="tool-label">HCI notes</span>
        <span className="visually-hidden"> (show labels for design principles)</span>
      </button>
      <Annotation id="annotations" />
    </div>
  );
}

function Brand({ onClick, href }) {
  return (
    <a className="brand" href={href} onClick={onClick}>
      <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
      <span className="brand-name">{profile.basics.name}</span>
    </a>
  );
}

// Profile header: brand, section links with scroll-spy, search and settings.
export const Header = forwardRef(function Header({ index, onSelect, active, onNav }, searchRef) {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Brand href="#overview" onClick={(e) => { e.preventDefault(); onNav("overview"); }} />
        <SearchBox ref={searchRef} index={index} onSelect={onSelect} />
        <Annotation id="search" />
        <Tools />
      </div>
      <nav className="container section-nav" aria-label="Sections">
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id} data-section={s.id}>
              <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); onNav(s.id); }}>
                <span className="nav-key" aria-hidden="true">{s.key}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <Annotation id="tabs" />
      </nav>
    </header>
  );
});

// Lab header: brand, a clear way back, and the same settings.
export function LabHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Brand href="#overview" />
        <a className="btn" href="#overview">← Back to profile</a>
        <Tools />
      </div>
    </header>
  );
}
