import { useEffect, useState } from "react";

const read = (key, initial) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...initial, ...JSON.parse(raw) } : initial;
  } catch {
    return initial;
  }
};

// State that survives reloads and stays in sync across tabs (e.g. the
// facilitator's Lab tab and the participant's profile tab).
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => read(key, initial));

  useEffect(() => {
    try {
      if (localStorage.getItem(key) !== JSON.stringify(value)) localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, [key, value]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) setValue(read(key, initial));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
