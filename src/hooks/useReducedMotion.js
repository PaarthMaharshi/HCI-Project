import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";
const EVENT = "hci-motionchange";

// The visitor's own choice ("on" / "off"), stored by the Animations button or
// ?motion=on|off and mirrored on <html data-motion>. Without a choice the
// OS reduced-motion setting decides. See the script in index.html.
const motionChoice = () => (typeof document !== "undefined" ? document.documentElement.dataset.motion : undefined);
export const motionForced = () => motionChoice() === "on";

export function prefersReducedMotion() {
  const choice = motionChoice();
  if (choice === "on") return false;
  if (choice === "off") return true;
  return typeof matchMedia !== "undefined" && matchMedia(query).matches;
}

// Turn animations on or off for this visitor (remembered).
export function setAnimations(on) {
  const value = on ? "on" : "off";
  try { localStorage.setItem("hci-motion", value); } catch (e) {}
  document.documentElement.dataset.motion = value;
  window.dispatchEvent(new Event(EVENT));
}

// True when motion should be reduced; animated components render their final state.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setReduce(prefersReducedMotion());
    mq.addEventListener("change", on);
    window.addEventListener(EVENT, on);
    return () => { mq.removeEventListener("change", on); window.removeEventListener(EVENT, on); };
  }, []);
  return reduce;
}
