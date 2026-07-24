"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  THEME_STORAGE_KEY,
  applyThemeClass,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolved: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = resolveTheme(localStorage.getItem(THEME_STORAGE_KEY));
    setThemeState(stored);
    applyThemeClass(stored);
    setResolved(
      stored === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : stored,
    );
  }, []);

  useEffect(() => {
    applyThemeClass(theme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const next =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      setResolved(next);
      applyThemeClass(theme);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyThemeClass(next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolved }),
    [theme, setTheme, resolved],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
