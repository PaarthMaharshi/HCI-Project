import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof matchMedia !== "undefined" && matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export const DESKTOP = "(min-width: 75rem)";
// Media-query rems ignore the root font size, so with larger text (125%) the
// full desktop bar needs 125% more room before it fits.
export const DESKTOP_LARGE_TEXT = "(min-width: 93.75rem)";
export const PHONE = "(max-width: 47.99rem)";
