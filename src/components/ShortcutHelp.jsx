import { useEffect, useRef } from "react";
import { LAB, SECTIONS } from "../data/profile.js";
import { Annotation } from "./Annotation.jsx";

// Native <dialog>: focus is trapped and Esc closes it for free.
export function ShortcutHelp({ open, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="help-title">
      <h2 id="help-title">Keyboard shortcuts</h2>
      <dl className="shortcut-list">
        <dt><kbd>/</kbd></dt>
        <dd>Search everything</dd>
        <dt><kbd>↑</kbd> <kbd>↓</kbd> <kbd>Enter</kbd></dt>
        <dd>Choose a search result</dd>
        <dt><kbd>Esc</kbd></dt>
        <dd>Close search or this panel</dd>
        <dt><kbd>1</kbd>–<kbd>7</kbd></dt>
        <dd>Jump to a section: {SECTIONS.map((s) => `${s.key} ${s.label}`).join(" · ")}</dd>
        <dt><kbd>{LAB.key}</kbd></dt>
        <dd>Open the {LAB.label} (for test facilitators)</dd>
        <dt><kbd>?</kbd></dt>
        <dd>Show this panel</dd>
      </dl>
      <Annotation id="help" block />
      <form method="dialog">
        <button className="btn btn-primary">Close</button>
      </form>
    </dialog>
  );
}
