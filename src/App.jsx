import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LAB, SECTIONS, profile } from "./data/profile.js";
import { AnnotationsButton, Sidebar } from "./components/Sidebar.jsx";
import { Annotation } from "./components/Annotation.jsx";
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

// The Lab is only for facilitators, so it loads on demand.
const LabPage = lazy(() => import("./pages/LabPage.jsx").then((m) => ({ default: m.LabPage })));

const SETTING_TARGETS = { textSize: "ctl-text-size", theme: "ctl-theme", annotations: "ctl-annotations" };
const SECTION_IDS = SECTIONS.map((s) => s.id);

const hashId = () => window.location.hash.slice(1);
const pageFromHash = () => (hashId() === LAB.id ? "lab" : "profile");
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

function Footer({ page, onHelp }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="footer-id">
          <span className="brand-mark" aria-hidden="true">{profile.basics.initials}</span>
          <span className="mono">© {profile.basics.name} · Last updated {formatMonth(profile.lastUpdated)}</span>
        </span>
        <span className="footer-actions">
          <AnnotationsButton className="btn btn-ghost" />
          <Annotation id="annotations" />
          <button type="button" className="btn btn-ghost" onClick={onHelp}>
            <KeyboardIcon /> Keyboard shortcuts <kbd aria-hidden="true">?</kbd>
          </button>
          {page === "lab" ? (
            <a className="btn btn-ghost" href="#overview">← Back to profile</a>
          ) : (
            <a className="btn btn-ghost" href={`#${LAB.id}`}>Usability Lab <kbd aria-hidden="true">{LAB.key}</kbd></a>
          )}
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const prefs = usePrefsState();
  const reduce = useReducedMotion();
  const [page, setPage] = useState(pageFromHash);
  const [openIds, setOpenIds] = useState(() => new Set());
  const [projectTags, setProjectTags] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [pending, setPending] = useState(null);
  const searchRef = useRef();
  const index = useMemo(() => buildIndex(profile), []);
  const [active, setActive] = useScrollSpy(SECTION_IDS, page === "profile");

  // #lab switches to the Lab view; a section hash (on load or Back/Forward) scrolls to that section.
  useEffect(() => {
    const onHash = () => {
      const next = pageFromHash();
      setPage(next);
      if (next === "profile" && SECTION_IDS.includes(hashId())) setPending({ el: hashId(), block: "start", ring: false, n: Date.now() });
      if (next === "lab") window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    if (SECTION_IDS.includes(hashId()) && hashId() !== "overview") setPending({ el: hashId(), block: "start", ring: false, n: Date.now() });
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = page === "lab" ? `${LAB.label} · ${profile.basics.name}` : profile.basics.name;
  }, [page]);

  // Keep the address bar in step with the section on screen, without adding history entries.
  useEffect(() => {
    if (page !== "profile" || !active || hashId() === active) return;
    if (!hashId() && active === "overview") return;
    history.replaceState(null, "", `#${active}`);
  }, [active, page]);

  // Act after React has rendered the target (opened disclosure, cleared filter).
  useEffect(() => {
    if (!pending) return;
    const id = requestAnimationFrame(() => flash(pending.el, pending));
    return () => cancelAnimationFrame(id);
  }, [pending]);

  // Jump to a section (pushes history so Back returns), or to a specific element in it.
  const goTo = useCallback((section, { target } = {}) => {
    if (hashId() !== section) history.pushState(null, "", `#${section}`);
    setPage("profile");
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

  const hotkeys = { "?": () => setHelpOpen(true), [LAB.key]: () => { window.location.hash = LAB.id; } };
  if (page === "profile") {
    hotkeys["/"] = () => searchRef.current?.focus();
    for (const s of SECTIONS) hotkeys[s.key] = () => goTo(s.id);
  }
  useHotkeys(hotkeys);

  const view = { active, goTo, openIds, toggleOpen, projectTags, setProjectTags, reveal };

  return (
    <PrefsContext.Provider value={prefs}>
      <ViewContext.Provider value={view}>
        <ToastProvider>
          <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
            Skip to content
          </a>
          <ClickSpark disabled={reduce} sparkColor={prefs.theme === "dark" ? "#f9a8d4" : "#be185d"} sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
            {page === "lab" ? (
              <>
                <Suspense fallback={<p className="container lab-main">Loading the Usability Lab…</p>}>
                  <LabPage />
                </Suspense>
                <Footer page={page} onHelp={() => setHelpOpen(true)} />
              </>
            ) : (
              <div className="layout">
                <Sidebar ref={searchRef} index={index} onSelect={onSelect} active={active} onNav={goTo} onHelp={() => setHelpOpen(true)} />
                <div className="content">
                  <ProfilePage active={active} onNav={goTo} onSearch={focusSearch} />
                  <Footer page={page} onHelp={() => setHelpOpen(true)} />
                </div>
              </div>
            )}
          </ClickSpark>
          <ShortcutHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
        </ToastProvider>
      </ViewContext.Provider>
    </PrefsContext.Provider>
  );
}
