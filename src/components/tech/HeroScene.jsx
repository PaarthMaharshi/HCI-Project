import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { Blob } from "./Blob.jsx";
import { Chip, Drone, Gear, RingPlanet } from "./Robot.jsx";

// Feeds pointer position (-1..1) into --px/--py on the given element, so any
// child with a --depth drifts with it (mouse parallax). Eased in CSS.
export function useParallax(ref) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const leave = () => { el.style.setProperty("--px", 0); el.style.setProperty("--py", 0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [ref, reduce]);
}

// One drifting layer: outer element takes the parallax, inner one floats.
function Layer({ depth, className, float = "a", children }) {
  return (
    <div className={`par ${className}`} style={{ "--depth": depth }}>
      <div className={`float float-${float}`}>{children}</div>
    </div>
  );
}

// Background of the hero: morphing ink blobs with little tech props drifting
// around them. Hidden from assistive tech.
export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Layer depth={-10} className="blob-a" float="slow"><Blob seed={3} speed={0.7} /></Layer>
      <Layer depth={14} className="blob-b" float="slow"><Blob seed={11} speed={0.9} /></Layer>
      <Layer depth={-8} className="blob-c" float="slow"><Blob seed={27} speed={0.6} /></Layer>
      <Layer depth={10} className="blob-d" float="slow"><Blob seed={42} speed={0.8} /></Layer>

      <Layer depth={-26} className="prop prop-planet" float="b"><RingPlanet /></Layer>
      <Layer depth={30} className="prop prop-drone" float="a"><Drone /></Layer>
      <Layer depth={-20} className="prop prop-chip" float="c"><Chip /></Layer>
      <Layer depth={22} className="prop prop-gear-wrap" float="b"><Gear /></Layer>

      <Layer depth={36} className="glyph glyph-1" float="c"><span>&lt;/&gt;</span></Layer>
      <Layer depth={-32} className="glyph glyph-2" float="a"><span>{"{ }"}</span></Layer>
      <Layer depth={24} className="glyph glyph-3" float="b"><span>01</span></Layer>
    </div>
  );
}
