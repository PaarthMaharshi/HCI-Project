import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

// Light by default (bright, warm design); dark only when the visitor chooses it.
export function usePrefsState() {
  const [prefs, setPrefs] = useLocalStorage("hci-prefs", { theme: null });
  const theme = prefs.theme === "dark" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setPrefs((p) => ({ ...p, theme: theme === "dark" ? "light" : "dark" })),
  };
}

export const PrefsContext = createContext(null);
export const usePrefs = () => useContext(PrefsContext);
