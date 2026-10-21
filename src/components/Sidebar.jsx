import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SECTIONS, profile } from "../data/profile.js";
import { DESKTOP, DESKTOP_LARGE_TEXT, useMediaQuery } from "../hooks/useMediaQuery.js";
import { usePrefs } from "../hooks/usePrefs.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { useScrollProgress } from "../hooks/useScrollProgress.js";
import { KeyboardIcon, MailIcon, MoonIcon, SunIcon } from "./Icons.jsx";
import Magnet from "./reactbits/Magnet/Magnet.jsx";
import StarBorder from "./reactbits/StarBorder/StarBorder.jsx";
import { Annotation } from "./Annotation.jsx";
import { SearchBox } from "./SearchBox.jsx";

export function ThemeButton({ withLabel = false }) {
  const p = usePrefs();
  const next = p.theme === "dark" ? "Light" : "Dark";
  return (
    <button
      id="ctl-theme"
      type="button"
      className={`icon-btn${withLabel ? " has-label" : ""}`}
      data-tip={`${next} theme`}
      onClick={p.toggleTheme}
      aria-label={`Switch to ${next.toLowerCase()} theme`}
    >
      <span className="theme-swap" key={p.theme}>{p.theme === "dark" ? <SunIcon /> : <MoonIcon />}</span>
      {withLabel && <span aria-hidden="true">{next} theme</span>}
    </button>
  );
}

// Larger text (WCAG 1.4.4): scales the whole page to 125%.
export function TextSizeButton({ withLabel = false }) {
  const p = usePrefs();
  const label = p.largeText ? "Normal text" : "Larger text";
  return (
    <button
      id="ctl-text-size"
      type="button"
      className={`icon-btn text-size-btn${withLabel ? " has-label" : ""}`}
      data-tip={label}
      aria-pressed={p.largeText}
      aria-label="Larger text"
      onClick={p.toggleLargeText}
    >
      <span className="text-size-glyph" aria-hidden="true">A<small>+</small></span>
      {withLabel && <span aria-hidden="true">{label}</span>}
    </button>
  );
}

// "Show HCI annotations": labels parts of the UI with the principle they apply.
export function AnnotationsButton({ className = "icon-btn has-label" }) {
  const p = usePrefs();
  return (
    <button id="ctl-annotations" type="button" className={className} aria-pressed={p.annotations} onClick={p.toggleAnnotations}>
      <span className="hci-glyph" aria-hidden="true">HCI</span> {p.annotations ? "Hide" : "Show"} HCI notes
    </button>
  );
}

// Annotation labels for the bar, shown under it while HCI notes are on.
function NavNotes() {
  const { annotations } = usePrefs();
  if (!annotations) return null;
  return (
    <div className="nav-notes">
      <Annotation id="nav" />
      <Annotation id="search" />
      <Annotation id="textSize" />
      <Annotation id="theme" />
    </div>
  );
}

function Brand({ onNav, showName = false }) {
  const b = profile.basics;
  return (
    <a className="nav-brand" href="#overview" onClick={(e) => { e.preventDefault(); onNav("overview"); }}>
      <span className="brand-mark" aria-hidden="true">{b.initials}</span>
      <span className={showName ? "brand-name" : "visually-hidden"}>{b.name}</span>
      <span className="visually-hidden">, back to top</span>
    </a>
  );
}

// "Say hi" pill with react-bits StarBorder; jumps to the copy-email button.
function ContactCta({ onNav, className = "" }) {
  const { theme } = usePrefs();
  return (
    <StarBorder
      as="a"
      href="#overview"
      className={`nav-cta ${className}`}
      color={theme === "dark" ? "#f9a8d4" : "#be185d"}
      speed="5s"
      onClick={(e) => { e.preventDefault(); onNav("overview", { target: "ctl-copy-email" }); }}
    >
      <MailIcon /> Say hi
    </StarBorder>
  );
}

// Section links. A tinted pill slides to the active link (scroll-spy) and
// follows the pointer while hovering, in that section's colour.
function NavLinks({ active, onNav }) {
  const listRef = useRef();
  const links = useRef({});
  const [hover, setHover] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });
  const shown = hover ?? active;

  const measure = useCallback(() => {
    const el = links.current[shown];
    if (!el || !listRef.current) return;
    const base = listRef.current.getBoundingClientRect().left;
    const r = el.getBoundingClientRect();
    setPill({ x: r.left - base, w: r.width, ready: true });
  }, [shown]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav className="nav-links" aria-label="Sections">
      <div className="nav-track" ref={listRef} onMouseLeave={() => setHover(null)}>
        <span
          className="nav-pill"
          aria-hidden="true"
          style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.ready ? 1 : 0, "--pill": `var(--c-${shown})` }}
        />
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                ref={(el) => (links.current[s.id] = el)}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                onMouseEnter={() => setHover(s.id)}
                onClick={(e) => { e.preventDefault(); onNav(s.id); }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function ScrollBar() {
  const progress = useScrollProgress();
  return (
    <div className="nav-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

// The bar gets a stronger glass backdrop once the page has scrolled.
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return scrolled;
}

// Drawer list: a colour dot per section, the active one filled and glowing.
function DrawerNav({ active, onNav }) {
  return (
    <nav className="drawer-nav" aria-label="Sections">
      <ul>
        {SECTIONS.map((s, i) => (
          <li key={s.id} style={{ "--i": i, "--dot": `var(--c-${s.id})` }}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); onNav(s.id); }}>
              <span className="drawer-dot" aria-hidden="true" />
              {s.label}
              <kbd aria-hidden="true">{s.key}</kbd>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 8h16M4 16h10" />
    </svg>
  );
}

// Phone/tablet: one slim floating bar + the navigation in a floating drawer (<dialog>).
function MobileBar({ index, onSelect, active, onNav, onHelp, searchRef }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef();
  const scrolled = useScrolled();

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
      <header className={`topbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="bar-shell topbar-row">
          <button type="button" className="icon-btn" aria-label="Menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
            <MenuIcon />
          </button>
          <Brand onNav={onNav} />
          <SearchBox ref={searchRef} index={index} onSelect={onSelect} placeholder="Search…" />
          <TextSizeButton />
          <ThemeButton />
          <ScrollBar />
        </div>
        <NavNotes />
      </header>
      <dialog ref={dialogRef} className="drawer" aria-label="Menu" onClose={() => setOpen(false)} onClick={(e) => { if (e.target === dialogRef.current) setOpen(false); }}>
        <div className="drawer-inner">
          <div className="drawer-top">
            <Brand onNav={navAndClose} showName />
            <button type="button" className="icon-btn drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <p className="side-status">
            <span className="status-dot" aria-hidden="true" />
            {profile.basics.availability}
          </p>
          <DrawerNav active={active} onNav={navAndClose} />
          <div className="drawer-bottom">
            <ContactCta onNav={navAndClose} className="drawer-cta" />
            <div className="drawer-tools">
              <ThemeButton withLabel />
              <button type="button" className="icon-btn has-label" onClick={() => { setOpen(false); onHelp(); }}>
                <KeyboardIcon /> Shortcuts
              </button>
              <AnnotationsButton className="icon-btn has-label drawer-wide" />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export const Sidebar = forwardRef(function Sidebar({ index, onSelect, active, onNav, onHelp }, searchRef) {
  const { largeText } = usePrefs();
  const desktop = useMediaQuery(largeText ? DESKTOP_LARGE_TEXT : DESKTOP);
  const scrolled = useScrolled();
  const reduce = useReducedMotion();
  if (!desktop) return <MobileBar index={index} onSelect={onSelect} active={active} onNav={onNav} onHelp={onHelp} searchRef={searchRef} />;
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="bar-shell nav-row">
        <Magnet padding={30} magnetStrength={4} disabled={reduce}>
          <Brand onNav={onNav} />
        </Magnet>
        <NavLinks active={active} onNav={onNav} />
        <span className="nav-sep" aria-hidden="true" />
        <div className="nav-search">
          <SearchBox ref={searchRef} index={index} onSelect={onSelect} placeholder="Search" />
        </div>
        <Magnet padding={24} magnetStrength={4} disabled={reduce}>
          <TextSizeButton />
        </Magnet>
        <Magnet padding={24} magnetStrength={4} disabled={reduce}>
          <ThemeButton />
        </Magnet>
        <ContactCta onNav={onNav} />
        <ScrollBar />
      </div>
      <NavNotes />
    </header>
  );
});
