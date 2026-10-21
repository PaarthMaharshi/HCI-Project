import { Annotation } from "./Annotation.jsx";

// Multi-select tag chips. Empty selection means "All".
export function TagFilter({ tags, selected, onChange, label }) {
  const toggle = (t) => onChange(selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t]);
  return (
    <div role="group" aria-label={label}>
      <div className="filter-bar">
        <button type="button" className="filter-chip" aria-pressed={selected.length === 0} onClick={() => onChange([])}>
          All
        </button>
        {tags.map((t) => (
          <button key={t} type="button" className="filter-chip" aria-pressed={selected.includes(t)} onClick={() => toggle(t)}>
            {t}
          </button>
        ))}
      </div>
      <Annotation id="filter" block />
    </div>
  );
}
