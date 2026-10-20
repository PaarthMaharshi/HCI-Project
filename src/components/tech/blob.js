// Organic "liquid" blob shapes, the core motion of the design.
// A blob is N points on a circle whose radii wobble with a few layered sine
// waves; the points are joined with a smooth Catmull-Rom curve. Because every
// frame has the same number of points, frames morph into each other cleanly.

const TAU = Math.PI * 2;

// Small deterministic PRNG so each blob keeps its own personality across renders.
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// Per-point wave settings for one blob.
export function makeBlob(seed, points = 8) {
  const r = rng(seed);
  return Array.from({ length: points }, () => ({
    a1: 0.06 + r() * 0.1, f1: 0.25 + r() * 0.35, p1: r() * TAU,
    a2: 0.03 + r() * 0.06, f2: 0.6 + r() * 0.6, p2: r() * TAU,
  }));
}

// Closed smooth path through the points (Catmull-Rom converted to cubic Béziers).
function smoothPath(pts) {
  const n = pts.length;
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d + "Z";
}

// Path for a blob at time t (seconds), centred on (cx, cy) with base radius r.
// `wobble` scales how far the edge breathes (0 = perfect circle).
export function blobPath(waves, t, cx = 50, cy = 50, r = 40, wobble = 1) {
  const n = waves.length;
  const pts = waves.map((w, i) => {
    const k = 1 + wobble * (w.a1 * Math.sin(t * w.f1 + w.p1) + w.a2 * Math.sin(t * w.f2 + w.p2));
    const ang = (i / n) * TAU - Math.PI / 2;
    return [cx + Math.cos(ang) * r * k, cy + Math.sin(ang) * r * k];
  });
  return smoothPath(pts);
}

// One shared animation clock: every subscriber gets the same timestamp per
// frame, and the loop stops when nobody is listening.
const subs = new Set();
let raf = 0;
const start = performance.now();
function tick(now) {
  const t = (now - start) / 1000;
  subs.forEach((fn) => fn(t));
  raf = subs.size ? requestAnimationFrame(tick) : 0;
}
export function onFrame(fn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => subs.delete(fn);
}
