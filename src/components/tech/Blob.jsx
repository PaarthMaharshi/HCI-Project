import { useEffect, useId, useMemo, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { blobPath, makeBlob, onFrame } from "./blob.js";

// A self-morphing ink blob. Its inside is a little piece of "tech night sky":
// a faint circuit grid, traces and twinkling nodes. Purely decorative.
// It only animates while on screen, and holds still under reduced motion.
// variant="sparkle" swaps the circuit for soft rings and sparkles.
export function Blob({ seed = 1, speed = 1, wobble = 1, className = "", style, circuit = true, variant = "tech" }) {
  const reduce = useReducedMotion();
  const waves = useMemo(() => makeBlob(seed, 9), [seed]);
  const pathRef = useRef();
  const clipRef = useRef();
  const svgRef = useRef();
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const draw = (t) => {
      const d = blobPath(waves, t * speed + seed * 7, 50, 50, 40, wobble);
      pathRef.current?.setAttribute("d", d);
      clipRef.current?.setAttribute("d", d);
    };
    draw(0);
    if (reduce) return;
    let off = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !off) off = onFrame(draw);
      if (!e.isIntersecting && off) { off(); off = null; }
    });
    io.observe(svgRef.current);
    return () => { io.disconnect(); off?.(); };
  }, [waves, speed, wobble, seed, reduce]);

  return (
    <svg ref={svgRef} className={`blob ${className}`} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`clip-${uid}`}><path ref={clipRef} /></clipPath>
        <pattern id={`grid-${uid}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M6 0H0V6" fill="none" className="blob-grid" />
        </pattern>
      </defs>
      <path ref={pathRef} className="blob-fill" />
      {circuit && variant === "sparkle" && (
        <g clipPath={`url(#clip-${uid})`}>
          {[[30, 30, 7], [68, 62, 9], [40, 70, 5], [74, 32, 5]].map(([x, y, r], i) => (
            <circle key={i} className="blob-ring" cx={x} cy={y} r={r} style={{ animationDelay: `${i * 0.7}s` }} />
          ))}
          {[[52, 20], [20, 52], [82, 50], [56, 44], [28, 82], [62, 84], [46, 56]].map(([x, y], i) => (
            <path key={`s${i}`} className="blob-sparkle" d={`M${x} ${y - 3}q.6 2.4 3 3q-2.4.6-3 3q-.6-2.4-3-3q2.4-.6 3-3z`} style={{ animationDelay: `${(i * 0.53) % 3}s` }} />
          ))}
        </g>
      )}
      {circuit && variant === "tech" && (
        <g clipPath={`url(#clip-${uid})`}>
          <rect width="100" height="100" fill={`url(#grid-${uid})`} />
          <path className="blob-trace" d="M18 62h14l6-6h16l5 5h22M30 34h10l6 6h18M60 24v10l6 6v14M24 48h8" />
          {[[32, 62], [59, 61], [64, 40], [30, 34], [66, 54], [24, 48], [60, 24]].map(([x, y], i) => (
            <circle key={i} className="blob-node" cx={x} cy={y} r="1.3" style={{ animationDelay: `${(i * 0.37) % 2}s` }} />
          ))}
          {[[42, 22], [74, 30], [20, 40], [50, 76], [78, 66], [36, 80], [70, 82]].map(([x, y], i) => (
            <path key={`s${i}`} className="blob-star" d={`M${x} ${y - 1.8}V${y + 1.8}M${x - 1.8} ${y}H${x + 1.8}`} style={{ animationDelay: `${(i * 0.53) % 3}s` }} />
          ))}
        </g>
      )}
    </svg>
  );
}
