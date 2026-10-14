import { useEffect, useRef } from "react";

const isTyping = (el) =>
  el &&
  (el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

// Global single-key shortcuts. Skipped while typing or with modifier keys,
// so they never clash with browser or screen-reader shortcuts.
export function useHotkeys(map) {
  const ref = useRef(map);
  ref.current = map;

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTyping(e.target)) return;
      if (document.querySelector("dialog[open]") && e.key !== "Escape") return;
      const handler = ref.current[e.key];
      if (handler) {
        e.preventDefault();
        handler(e);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
