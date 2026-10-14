import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

const systemDark = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;

// theme: null follows the OS setting until the user picks one.
export function usePrefsState() {
  const [prefs, setPrefs] = useLocalStorage("hci-prefs", {
    theme: null,
    largeText: false,
    annotations: false,
  });
  const theme = prefs.theme ?? (systemDark() ? "dark" : "light");

  useEffect(() => {
    const d = document.documentElement;
    d.dataset.theme = theme;
    if (prefs.largeText) d.dataset.text = "large";
    else delete d.dataset.text;
    d.dataset.annotate = prefs.annotations ? "on" : "off";
  }, [theme, prefs.largeText, prefs.annotations]);

  return {
    theme,
    largeText: prefs.largeText,
    annotations: prefs.annotations,
    toggleTheme: () => setPrefs((p) => ({ ...p, theme: theme === "dark" ? "light" : "dark" })),
    toggleLargeText: () => setPrefs((p) => ({ ...p, largeText: !p.largeText })),
    toggleAnnotations: () => setPrefs((p) => ({ ...p, annotations: !p.annotations })),
    // Before each test participant: text size and annotations back to default.
    resetForParticipant: () => setPrefs((p) => ({ ...p, largeText: false, annotations: false })),
  };
}

export const PrefsContext = createContext(null);
export const usePrefs = () => useContext(PrefsContext);
