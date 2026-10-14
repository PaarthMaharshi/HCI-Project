import { useView } from "../view.js";
import { ChevronIcon } from "./Icons.jsx";
import { Annotation } from "./Annotation.jsx";

// Collapsed-by-default details. Open state lives in App so search can open it.
export function Disclosure({ id, label, openLabel = "Hide details", children, annotate = false }) {
  const { openIds, toggleOpen } = useView();
  const open = openIds.has(id);
  const bodyId = `disc-${id}`;
  return (
    <div>
      <button type="button" className="disclosure-btn" aria-expanded={open} aria-controls={bodyId} onClick={() => toggleOpen(id)}>
        <ChevronIcon className="icon chev" />
        {open ? openLabel : label}
      </button>{" "}
      {annotate && <Annotation id="disclosure" />}
      <div id={bodyId} className="disclosure-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
