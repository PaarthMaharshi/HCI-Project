import { SECTIONS } from "../data/profile.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { Annotation } from "./Annotation.jsx";
import { BlurHeading } from "./Motion.jsx";
import ScrollVelocity from "./reactbits/ScrollVelocity/ScrollVelocity.jsx";

// Section heading: a slim marquee band in the section colour (decorative,
// hidden from screen readers), then the numbered <h2> blurring in word by word,
// with its subtitle alongside.
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
          <div className="band-static">{phrase.repeat(8)}</div>
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
        <div>
          <span className="section-num" aria-hidden="true">{number} —</span>
          <BlurHeading as="h2" id={`${id}-h`} text={title} className="section-h" />
        </div>
        {children && <p className="section-sub">{children}</p>}
        {index === 0 || index === 1 ? <Annotation id="band" /> : null}
      </div>
    </div>
  );
}
