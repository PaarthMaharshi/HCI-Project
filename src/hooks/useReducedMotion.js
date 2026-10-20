import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

// Visitors can opt back in to motion with ?motion=on (saved; ?motion=off undoes it),
// e.g. when their OS turns animation off globally. See the script in index.html.
export const motionForced = () => typeof document !== "undefined" && document.documentElement.dataset.motion === "on";

// True when the OS asks for less motion; animated components render their final state.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(() => !motionForced() && typeof matchMedia !== "undefined" && matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setReduce(!motionForced() && mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}
