// Decorative shapes that float around the hero. All hidden from assistive tech.

// Glossy sphere with a soft highlight.
export function Orb() {
  return (
    <svg viewBox="0 0 100 100" className="prop-svg orb" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="orb-fill" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="0.55" stopColor="#ec4899" />
          <stop offset="1" stopColor="#9d174d" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#orb-fill)" />
      <ellipse cx="36" cy="30" rx="12" ry="7" fill="rgb(255 255 255 / 0.55)" transform="rotate(-30 36 30)" />
    </svg>
  );
}

// Thin ring with a small dot travelling round it.
export function Ring() {
  return (
    <svg viewBox="0 0 100 100" className="prop-svg ring" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="40" className="ring-line" />
      <g className="ring-orbit">
        <circle cx="50" cy="10" r="6" className="ring-dot" />
      </g>
    </svg>
  );
}

// Four-point sparkle.
export function Sparkle() {
  return (
    <svg viewBox="0 0 40 40" className="prop-svg sparkle" aria-hidden="true" focusable="false">
      <path d="M20 2c2 11 7 16 18 18-11 2-16 7-18 18-2-11-7-16-18-18C13 18 18 13 20 2z" />
    </svg>
  );
}
