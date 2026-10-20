import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { blobPath, makeBlob, onFrame } from "./blob.js";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

// The "liquid takeover" from the reference: as this band scrolls in, an ink
// blob rises from below and swells until it floods the screen, inverting the
// colours for the content inside. The blob lives in a sticky, viewport-sized
// layer so whatever part of the band is on screen stays covered.
// Content fades in only once the ink is behind it, so text is never shown on
// the wrong background. Reduced motion: fully flooded from the start.
export function InkFlood({ children, className = "" }) {
  const reduce = useReducedMotion();
  const zone = useRef();
  const path = useRef();
  const waves = useMemo(() => makeBlob(77, 10), []);

  useEffect(() => {
    const el = zone.current;
    // p: how far the band has come in (0..1). h: how much of the sticky layer
    // is on screen, in viewBox units; the blob is centred on the screen's
    // bottom edge so it rises into view, then swells past every corner.
    const set = (p, h, t) => {
      // Radius tracks the visible height so the curved edge stays on screen
      // for most of the scroll; the last stretch swells it past the corners.
      const r = 2 + h * (0.2 + smooth(0, 1, p) + 0.6 * smooth(0.8, 1, p));
      path.current?.setAttribute("d", blobPath(waves, t * 0.8, 50, h, r, 1.6 - p));
      el.style.setProperty("--ink-in", smooth(0.7, 0.95, p).toFixed(3));
    };
    if (reduce) { el.style.setProperty("--ink-in", 1); path.current?.setAttribute("d", "M0 0H100V100H0Z"); return; }

    let p = 0, h = 0, off = null;
    const measure = () => {
      const top = el.getBoundingClientRect().top;
      p = clamp((innerHeight - top) / (innerHeight * 0.8));
      h = 100 * clamp((innerHeight - top) / innerHeight);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !off) off = onFrame((t) => { measure(); set(p, h, t); });
      if (!e.isIntersecting && off) { off(); off = null; }
    });
    measure();
    set(p, h, 0);
    io.observe(el);
    return () => { io.disconnect(); off?.(); };
  }, [reduce, waves]);

  return (
    <div ref={zone} className={`ink-zone ${className}`}>
      <div className="ink-track" aria-hidden="true">
        <div className="ink-sticky">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <path ref={path} className="ink-fill" />
          </svg>
          <div className="ink-grid" />
        </div>
      </div>
      <div className="ink-content">{children}</div>
    </div>
  );
}
