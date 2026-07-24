import { DEFAULT_LOCALE, type Locale, LOCALES } from "./types";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export const LOCALE_COOKIE = "sparehand_locale";
