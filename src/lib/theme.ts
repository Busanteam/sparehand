export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "sparehand_theme";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(value: string | null | undefined): Theme {
  return isTheme(value) ? value : "system";
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeClass(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}
