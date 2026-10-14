import { SECTIONS } from "../data/profile.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { Annotation } from "./Annotation.jsx";
import ScrollVelocity from "./reactbits/ScrollVelocity/ScrollVelocity.jsx";

// Section heading: a tilted marquee band in the section colour (decorative,
// hidden from screen readers) above the real <h2> with its number and subtitle.
export function SectionBand({ id, title, band = title, children }) {
  const reduce = useReducedMotion();
  const index = SECTIONS.findIndex((s) => s.id === id);
  const number = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  const phrase = `${band} ✦ `;

  return (
    <div className="section-band-wrap">
      <div className={`section-band${flip ? " is-flipped" : ""}`} aria-hidden="true">
        {reduce ? (
          <div className="band-static">{phrase.repeat(6)}</div>
        ) : (
          <ScrollVelocity
            texts={[phrase]}
            velocity={flip ? -40 : 40}
            numCopies={8}
            className="band-text"
            parallaxClassName="band-parallax"
            scrollerClassName="band-scroller"
          />
        )}
      </div>
      <div className="section-title">
        <span className="section-num" aria-hidden="true">{number} —</span>
        <h2 id={`${id}-h`}>{title}</h2>
        {children && <p className="section-sub">{children}</p>}
        <Annotation id="band" />
      </div>
    </div>
  );
}
