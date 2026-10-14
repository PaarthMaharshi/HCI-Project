import { useRef } from "react";

// WAI-ARIA tabs with roving tabindex and automatic activation.
// items: [{ id, label, key? }]. Panels use id `${idPrefix}panel-${id}`.
export function Tabs({ items, active, onChange, idPrefix = "", label, className = "tabs", sectionColours = false }) {
  const refs = useRef({});

  const onKeyDown = (e) => {
    const i = items.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = items[next].id;
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={className} onKeyDown={onKeyDown}>
      {items.map((t) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            ref={(el) => (refs.current[t.id] = el)}
            type="button"
            role="tab"
            id={`${idPrefix}tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            className="tab"
            data-section={sectionColours ? t.id : undefined}
            onClick={() => onChange(t.id)}
          >
            {t.key && (
              <span className="tab-key" aria-hidden="true">
                {t.key}
              </span>
            )}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
