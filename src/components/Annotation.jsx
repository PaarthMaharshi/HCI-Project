import { NOTES } from "../data/hci.js";
import { usePrefs } from "../hooks/usePrefs.js";

// Shows which HCI principle a UI element applies, only while annotations are on.
export function Annotation({ id, block = false }) {
  const { annotations } = usePrefs();
  if (!annotations) return null;
  const note = <span className="hci-note">{NOTES[id]}</span>;
  return block ? <div className="hci-block">{note}</div> : note;
}
