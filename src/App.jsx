import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS, profile } from "./data/profile.js";
import { Header } from "./components/Header.jsx";
import { KeyboardIcon } from "./components/Icons.jsx";
import { ShortcutHelp } from "./components/ShortcutHelp.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { PrefsContext, usePrefsState } from "./hooks/usePrefs.js";
import { useHotkeys } from "./hooks/useHotkeys.js";
import { buildIndex } from "./lib/search.js";
import { formatMonth } from "./lib/format.js";
import { ViewContext } from "./view.js";
import { Activities } from "./sections/Activities.jsx";
import { Education } from "./sections/Education.jsx";
import { Experience } from "./sections/Experience.jsx";
import { Overview } from "./sections/Overview.jsx";
import { Projects, matchesTags } from "./sections/Projects.jsx";
import { Social } from "./sections/Social.jsx";
import { Writing } from "./sections/Writing.jsx";
import { UsabilityLab } from "./sections/lab/UsabilityLab.jsx";

const PANELS = { overview: Overview, experience: Experience, education: Education, projects: Projects, writing: Writing, social: Social, activities: Activities, lab: UsabilityLab };
const SETTING_TARGETS = { textSize: "ctl-text-size", theme: "ctl-theme", annotations: "ctl-annotations" };

const tabFromHash = () => {
  const h = window.location.hash.slice(1);
  return SECTIONS.some((s) => s.id === h) ? h : "overview";
};

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scrolls to an element, moves focus to it and flashes a highlight ring.
function flash(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
  if (el.tabIndex < 0 && !el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  el.classList.remove("is-highlighted");
  void el.offsetWidth; // restart the animation
  el.classList.add("is-highlighted");
  setTimeout(() => el.classList.remove("is-highlighted"), 2200);
}

export default function App() {
  const prefs = usePrefsState();
  const [active, setActive] = useState(tabFromHash);
  const [openIds, setOpenIds] = useState(() => new Set());
  const [projectTags, setProjectTags] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [pendingFlash, setPendingFlash] = useState(null);
  const searchRef = useRef();
  const index = useMemo(() => buildIndex(profile), []);

  useEffect(() => {
    const onHash = () => setActive(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const label = SECTIONS.find((s) => s.id === active)?.label;
    document.title = active === "overview" ? profile.basics.name : `${label} · ${profile.basics.name}`;
  }, [active]);

  // Flash after React has rendered the target tab / opened disclosure.
  useEffect(() => {
    if (!pendingFlash) return;
    const id = requestAnimationFrame(() => flash(pendingFlash.el));
    return () => cancelAnimationFrame(id);
  }, [pendingFlash]);

  const goTo = useCallback((section, { focusPanel = false } = {}) => {
    if (section !== tabFromHash()) window.location.hash = section; // pushes history, so Back works
    setActive(section);
    if (focusPanel) setPendingFlash({ el: `panel-${section}`, n: Date.now() });
  }, []);

  const toggleOpen = useCallback((id) => {
    setOpenIds((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  // Show a specific item: switch tab, clear a filter hiding it, open its details, flash it.
  const reveal = useCallback(
    (section, id, { disclose = false } = {}) => {
      goTo(section);
      if (section === "projects") {
        const p = profile.projects.find((x) => x.id === id);
        if (p && !matchesTags(p, projectTags)) setProjectTags([]);
      }
      if (disclose) setOpenIds((s) => new Set(s).add(id));
      setPendingFlash({ el: `item-${id}`, n: Date.now() });
    },
    [goTo, projectTags]
  );

  const onSelect = useCallback(
    (entry) => {
      if (entry.action === "help") return setHelpOpen(true);
      if (SETTING_TARGETS[entry.action]) return setPendingFlash({ el: SETTING_TARGETS[entry.action], n: Date.now() });
      if (entry.action === "email") {
        goTo("overview");
        return setPendingFlash({ el: "ctl-copy-email", n: Date.now() });
      }
      reveal(entry.section, entry.id, { disclose: entry.disclose });
    },
    [goTo, reveal]
  );

  const hotkeys = { "/": () => searchRef.current?.focus(), "?": () => setHelpOpen(true) };
  for (const s of SECTIONS) hotkeys[s.key] = () => goTo(s.id);
  useHotkeys(hotkeys);

  const view = { active, goTo, openIds, toggleOpen, projectTags, setProjectTags, reveal };

  return (
    <PrefsContext.Provider value={prefs}>
      <ViewContext.Provider value={view}>
        <ToastProvider>
          <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById(`panel-${active}`)?.focus(); }}>
            Skip to content
          </a>
          <Header ref={searchRef} index={index} onSelect={onSelect} active={active} onTab={goTo} />
          <main id="main" className="container">
            {/* Overview has the visible h1 (the name); other tabs get a hidden one. */}
            {active !== "overview" && (
              <h1 className="visually-hidden">
                {profile.basics.name}: {SECTIONS.find((s) => s.id === active)?.label}
              </h1>
            )}
            {SECTIONS.map((s) => {
              const Panel = PANELS[s.id];
              return (
                <div
                  key={s.id}
                  role="tabpanel"
                  id={`panel-${s.id}`}
                  aria-labelledby={`tab-${s.id}`}
                  data-section={s.id}
                  className="panel"
                  tabIndex={-1}
                  hidden={active !== s.id}
                >
                  <Panel />
                </div>
              );
            })}
          </main>
          <footer className="site-footer">
            <div className="container">
              <span>© {profile.basics.name} · Last updated {formatMonth(profile.lastUpdated)}</span>
              <button type="button" className="btn btn-ghost" onClick={() => setHelpOpen(true)}>
                <KeyboardIcon /> Keyboard shortcuts <kbd aria-hidden="true">?</kbd>
              </button>
            </div>
          </footer>
          <ShortcutHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
        </ToastProvider>
      </ViewContext.Provider>
    </PrefsContext.Provider>
  );
}
