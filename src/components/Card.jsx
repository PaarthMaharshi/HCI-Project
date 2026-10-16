import { usePrefs } from "../hooks/usePrefs.js";
import SpotlightCard from "./reactbits/SpotlightCard/SpotlightCard.jsx";

// Every searchable item has id="item-<id>" so search can scroll to and highlight it.
// Variants:
//   default    boxed card (used in the Usability Lab)
//   plain      open row separated by hairlines
//   spotlight  tile with the react-bits glow following the pointer or keyboard focus
export function Card({ id, as: Tag = "article", className = "", plain = false, spotlight = false, children, ...rest }) {
  const { theme } = usePrefs();
  const itemProps = {
    id: id ? `item-${id}` : undefined,
    "data-item": id ? "" : undefined,
    tabIndex: id ? -1 : undefined,
  };

  if (spotlight)
    return (
      <SpotlightCard
        theme={theme}
        spotlightColor="var(--accent)"
        intensity={0.55}
        borderGlow={0.9}
        className={`item tile ${className}`}
        style={{ "--spotlight-card-surface": "var(--surface)", "--spotlight-card-border": "var(--border)", "--spotlight-card-shadow": "var(--shadow)" }}
        role={Tag === "article" ? "article" : undefined}
        {...itemProps}
        {...rest}
      >
        {children}
      </SpotlightCard>
    );

  return (
    <Tag {...itemProps} className={`${plain ? "item" : "card"} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
