import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

// The hero mascot: a small floating robot. Its eyes follow the pointer, it
// blinks, waves, and does a happy spin when clicked. Decorative only.
export function Robot({ className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef();
  const eyes = useRef();
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let raf = 0, x = 0, y = 0;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.33);
        const len = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, len / 400);
        x = (dx / len) * 6 * k;
        y = (dy / len) * 5 * k;
        eyes.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [reduce]);

  const cheer = () => {
    if (reduce || happy) return;
    setHappy(true);
    setTimeout(() => setHappy(false), 1400);
  };

  return (
    <div ref={ref} className={`robot${happy ? " is-happy" : ""} ${className}`} aria-hidden="true" onClick={cheer}>
      <svg viewBox="0 0 220 270" className="robot-svg" focusable="false">
        {/* jet flame */}
        <g className="robot-jet">
          <path d="M96 228c0 18 14 34 14 34s14-16 14-34z" fill="#fb923c" />
          <path d="M103 228c0 11 7 22 7 22s7-11 7-22z" fill="#fde68a" />
        </g>
        {/* left arm */}
        <path d="M68 160c-14 4-24 14-28 28" className="r-line" fill="none" />
        <circle cx="38" cy="192" r="9" className="r-body" />
        {/* right arm (waves) */}
        <g className="robot-wave">
          <path d="M152 160c14-4 24-14 28-30" className="r-line" fill="none" />
          <circle cx="182" cy="124" r="9" className="r-body" />
        </g>
        {/* body */}
        <rect x="70" y="136" width="80" height="20" rx="6" className="r-body" />
        <rect x="64" y="146" width="92" height="78" rx="28" className="r-body" />
        <rect x="88" y="166" width="44" height="36" rx="10" className="r-panel" />
        <circle cx="110" cy="184" r="7" className="robot-core" />
        <path d="M94 212h32" className="r-line thin" />
        {/* antenna */}
        <path d="M110 40V20" className="r-line" />
        <circle cx="110" cy="15" r="7" className="robot-bulb" />
        {/* ears */}
        <rect x="40" y="70" width="14" height="34" rx="6" className="r-body" />
        <rect x="166" y="70" width="14" height="34" rx="6" className="r-body" />
        {/* head */}
        <rect x="50" y="38" width="120" height="100" rx="38" className="r-body" />
        <rect x="64" y="54" width="92" height="66" rx="24" className="r-screen" />
        <path d="M74 66q8-6 18-6" className="r-glint" />
        {/* face */}
        <g ref={eyes}>
          <g className="robot-eyes">
            {happy ? (
              <>
                <path d="M84 88q8-10 16 0" className="r-eye-line" />
                <path d="M120 88q8-10 16 0" className="r-eye-line" />
              </>
            ) : (
              <>
                <ellipse cx="92" cy="86" rx="8" ry="11" className="r-eye" />
                <ellipse cx="128" cy="86" rx="8" ry="11" className="r-eye" />
                <circle cx="95" cy="82" r="2.6" fill="#fff" />
                <circle cx="131" cy="82" r="2.6" fill="#fff" />
              </>
            )}
          </g>
          <circle cx="78" cy="103" r="6" className="r-cheek" />
          <circle cx="142" cy="103" r="6" className="r-cheek" />
          <path d={happy ? "M98 100q12 14 24 0" : "M101 102q9 7 18 0"} className="r-eye-line" />
        </g>
      </svg>
      <span className="robot-shadow" />
    </div>
  );
}

// ---- Smaller floating props (replace the alien, UFO, planet and telescope) ----

export function Drone() {
  return (
    <svg viewBox="0 0 120 80" className="prop-svg" aria-hidden="true" focusable="false">
      <path d="M20 22h24M76 22h24" className="r-line" />
      <ellipse cx="32" cy="16" rx="18" ry="4" className="r-body prop-rotor" />
      <ellipse cx="88" cy="16" rx="18" ry="4" className="r-body prop-rotor" />
      <path d="M32 20v8M88 20v8" className="r-line" />
      <rect x="28" y="26" width="64" height="30" rx="15" className="r-body" />
      <rect x="42" y="32" width="36" height="16" rx="8" className="r-screen" />
      <circle cx="53" cy="40" r="3.4" className="r-eye" />
      <circle cx="67" cy="40" r="3.4" className="r-eye" />
      <path d="M50 56l-6 10M70 56l6 10" className="r-line" />
      <path className="prop-beam" d="M48 66h24l12 14H36z" />
    </svg>
  );
}

export function RingPlanet() {
  return (
    <svg viewBox="0 0 140 110" className="prop-svg" aria-hidden="true" focusable="false">
      <g transform="rotate(-14 70 55)">
        <ellipse cx="70" cy="55" rx="64" ry="14" className="r-line" fill="none" />
      </g>
      <circle cx="70" cy="55" r="34" className="r-body" />
      <path d="M40 42c12 4 40 4 60-4M38 60c18 6 44 6 64-2M46 76c12 3 30 3 44-1" className="r-line thin" fill="none" />
      <circle cx="58" cy="48" r="3" className="robot-core" />
      <circle cx="84" cy="66" r="2.4" className="robot-core" />
      <g transform="rotate(-14 70 55)">
        <path d="M6 55A64 14 0 0 0 134 55" className="r-line" fill="none" />
      </g>
    </svg>
  );
}

export function Chip() {
  return (
    <svg viewBox="0 0 100 100" className="prop-svg" aria-hidden="true" focusable="false">
      {[28, 42, 56, 70].map((p) => (
        <g key={p}>
          <path d={`M${p} 10v12M${p} 78v12M10 ${p}h12M78 ${p}h12`} className="r-line" />
        </g>
      ))}
      <rect x="20" y="20" width="60" height="60" rx="10" className="r-body" />
      <rect x="32" y="32" width="36" height="36" rx="6" className="r-screen" />
      <text x="50" y="56" textAnchor="middle" className="chip-text">AI</text>
    </svg>
  );
}

export function Gear() {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 100 100" className="prop-svg prop-gear" aria-hidden="true" focusable="false">
      {teeth.map((a) => (
        <rect key={a} x="43" y="6" width="14" height="18" rx="3" className="r-body" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="32" className="r-body" />
      <circle cx="50" cy="50" r="12" className="r-screen" />
    </svg>
  );
}
