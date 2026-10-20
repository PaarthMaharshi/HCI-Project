import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS, profile } from "./data/profile.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { KeyboardIcon } from "./components/Icons.jsx";
import ClickSpark from "./components/reactbits/ClickSpark/ClickSpark.jsx";
import { ShortcutHelp } from "./components/ShortcutHelp.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { PrefsContext, usePrefsState } from "./hooks/usePrefs.js";
import { useHotkeys } from "./hooks/useHotkeys.js";
import { motionForced, useReducedMotion } from "./hooks/useReducedMotion.js";
import { useScrollSpy } from "./hooks/useScrollSpy.js";
import { buildIndex } from "./lib/search.js";
import { formatMonth } from "./lib/format.js";
import { ViewContext } from "./view.js";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { matchesTags } from "./sections/Projects.jsx";

const SETTING_TARGETS = { theme: "ctl-theme" };
const SECTION_IDS = SECTIONS.map((s) => s.id);

const hashId = () => window.location.hash.slice(1);
const reducedMotion = () => !motionForced() && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scrolls to an element, moves focus to it and flashes a highlight ring.
function flash(elementId, { block = "center", ring = true } = {}) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.scrollIntoView({ block, behavior: reducedMotion() ? "auto" : "smooth" });
  if (!el.hasAttribute("tabindex") && el.tabIndex < 0) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  if (!ring) return;
  el.classList.remove("is-highlighted");
  void el.offsetWidth; // restart the animation
  el.classList.add("is-highlighted");
  setTimeout(() => el.classList.remove("is-highlighted"), 2200);
}

function Footer({ onHelp }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="footer-id">
          <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
          <span className="mono">© {profile.basics.name} · Last updated {formatMonth(profile.lastUpdated)}</span>
        </span>
        <span className="footer-actions">
          <button type="button" className="btn btn-ghost" onClick={onHelp}>
            <KeyboardIcon /> Keyboard shortcuts <kbd aria-hidden="true">?</kbd>
          </button>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const prefs = usePrefsState();
  const reduce = useReducedMotion();
  const [openIds, setOpenIds] = useState(() => new Set());
  const [projectTags, setProjectTags] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [pending, setPending] = useState(null);
  const searchRef = useRef();
  const index = useMemo(() => buildIndex(profile), []);
  const [active, setActive] = useScrollSpy(SECTION_IDS, true);

  // A section hash (on load or Back/Forward) scrolls to that section.
  useEffect(() => {
    const onHash = () => {
      if (SECTION_IDS.includes(hashId())) setPending({ el: hashId(), block: "start", ring: false, n: Date.now() });
    };
    window.addEventListener("hashchange", onHash);
    if (SECTION_IDS.includes(hashId()) && hashId() !== "overview") onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Keep the address bar in step with the section on screen, without adding history entries.
  useEffect(() => {
    if (!active || hashId() === active) return;
    if (!hashId() && active === "overview") return;
    history.replaceState(null, "", `#${active}`);
  }, [active]);

  // Act after React has rendered the target (opened disclosure, cleared filter).
  useEffect(() => {
    if (!pending) return;
    const id = requestAnimationFrame(() => flash(pending.el, pending));
    return () => cancelAnimationFrame(id);
  }, [pending]);

  // Jump to a section (pushes history so Back returns), or to a specific element in it.
  const goTo = useCallback((section, { target } = {}) => {
    if (hashId() !== section) history.pushState(null, "", `#${section}`);
    setActive(section);
    setPending(target ? { el: target, n: Date.now() } : { el: section, block: "start", ring: false, n: Date.now() });
  }, [setActive]);

  const toggleOpen = useCallback((id) => {
    setOpenIds((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  // Show a specific item: clear a filter hiding it, open its details, scroll to it and flash it.
  const reveal = useCallback(
    (section, id, { disclose = false } = {}) => {
      if (section === "projects") {
        const p = profile.projects.find((x) => x.id === id);
        if (p && !matchesTags(p, projectTags)) setProjectTags([]);
      }
      if (disclose) setOpenIds((s) => new Set(s).add(id));
      setPending({ el: `item-${id}`, n: Date.now() });
    },
    [projectTags]
  );

  const onSelect = useCallback(
    (entry) => {
      if (entry.action === "help") return setHelpOpen(true);
      if (SETTING_TARGETS[entry.action]) return setPending({ el: SETTING_TARGETS[entry.action], n: Date.now() });
      if (entry.action === "email") return setPending({ el: "ctl-copy-email", n: Date.now() });
      reveal(entry.section, entry.id, { disclose: entry.disclose });
    },
    [reveal]
  );

  const focusSearch = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
    searchRef.current?.focus({ preventScroll: true });
  }, []);

  const hotkeys = { "?": () => setHelpOpen(true), "/": () => searchRef.current?.focus() };
  for (const s of SECTIONS) hotkeys[s.key] = () => goTo(s.id);
  useHotkeys(hotkeys);

  const view = { active, goTo, openIds, toggleOpen, projectTags, setProjectTags, reveal };

  return (
    <PrefsContext.Provider value={prefs}>
      <ViewContext.Provider value={view}>
        <ToastProvider>
          <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
            Skip to content
          </a>
          <ClickSpark disabled={reduce} sparkColor={prefs.theme === "dark" ? "#fdba74" : "#c2410c"} sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
            <div className="layout">
              <Sidebar ref={searchRef} index={index} onSelect={onSelect} active={active} onNav={goTo} onHelp={() => setHelpOpen(true)} />
              <div className="content">
                <ProfilePage active={active} onNav={goTo} onSearch={focusSearch} />
                <Footer onHelp={() => setHelpOpen(true)} />
              </div>
            </div>
          </ClickSpark>
          <ShortcutHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
        </ToastProvider>
      </ViewContext.Provider>
    </PrefsContext.Provider>
  );
}
