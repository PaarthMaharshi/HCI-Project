import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { Blob } from "./Blob.jsx";
import { Orb, Ring, Sparkle } from "./Shapes.jsx";

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

// Background of the hero: morphing blobs with orbs, rings and sparkles
// drifting around them. Hidden from assistive tech.
export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Layer depth={-10} className="blob-a" float="slow"><Blob seed={3} speed={0.7} variant="sparkle" /></Layer>
      <Layer depth={14} className="blob-b" float="slow"><Blob seed={11} speed={0.9} variant="sparkle" /></Layer>
      <Layer depth={-8} className="blob-c" float="slow"><Blob seed={27} speed={0.6} variant="sparkle" /></Layer>
      <Layer depth={10} className="blob-d" float="slow"><Blob seed={42} speed={0.8} variant="sparkle" /></Layer>

      <Layer depth={-26} className="prop prop-ring-1" float="b"><Ring /></Layer>
      <Layer depth={30} className="prop prop-orb-1" float="a"><Orb /></Layer>
      <Layer depth={-20} className="prop prop-orb-2" float="c"><Orb /></Layer>
      <Layer depth={22} className="prop prop-spark-1" float="b"><Sparkle /></Layer>
      <Layer depth={-14} className="prop prop-spark-2" float="c"><Sparkle /></Layer>
      <Layer depth={18} className="prop prop-spark-3" float="a"><Sparkle /></Layer>
    </div>
  );
}
