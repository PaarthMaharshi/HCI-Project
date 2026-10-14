import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

// True when the OS asks for less motion; animated components render their final state.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(() => typeof matchMedia !== "undefined" && matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}
