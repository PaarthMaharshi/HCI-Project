import { forwardRef } from "react";
import { SECTIONS, profile } from "../data/profile.js";
import { usePrefs } from "../hooks/usePrefs.js";
import { Annotation } from "./Annotation.jsx";
import { InfoIcon, MoonIcon, SunIcon, TextIcon } from "./Icons.jsx";
import { SearchBox } from "./SearchBox.jsx";
import { Tabs } from "./Tabs.jsx";

export const Header = forwardRef(function Header({ index, onSelect, active, onTab }, searchRef) {
  const p = usePrefs();
  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="brand" href="#overview" onClick={(e) => { e.preventDefault(); onTab("overview"); }}>
          <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
          {profile.basics.name}
        </a>
        <SearchBox ref={searchRef} index={index} onSelect={onSelect} />
        <Annotation id="search" />
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
            <span className="tool-label">HCI annotations</span>
            <span className="visually-hidden"> (show labels for design principles)</span>
          </button>
          <Annotation id="annotations" />
        </div>
      </div>
      <nav className="container" aria-label="Sections">
        <Tabs items={SECTIONS} active={active} onChange={onTab} label="Profile sections" sectionColours />
        <Annotation id="tabs" block />
      </nav>
    </header>
  );
});
