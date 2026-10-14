import { usePrefs } from "../hooks/usePrefs.js";
import SpotlightCard from "./reactbits/SpotlightCard/SpotlightCard.jsx";

// Every searchable item is a Card with id="item-<id>" so search can scroll to it.
// `spotlight` adds the react-bits hover/focus glow in the section's accent colour.
export function Card({ id, as: Tag = "article", className = "", spotlight = false, children, ...rest }) {
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
        intensity={0.35}
        borderGlow={0.8}
        className={`card ${className}`}
        role={Tag === "article" ? "article" : undefined}
        {...itemProps}
        {...rest}
      >
        {children}
      </SpotlightCard>
    );

  return (
    <Tag {...itemProps} className={`card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
