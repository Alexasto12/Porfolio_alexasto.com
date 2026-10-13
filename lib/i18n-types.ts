export type Locale = "es" | "en" | "ca";

export const LOCALES: Locale[] = ["es", "ca", "en"];

export const LOCALE_FULL: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
};

/** BCP 47 tags for Intl number formatting. */
export const LOCALE_TAG: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-US",
};

export type Localized<T = string> = Record<Locale, T>;

/** A value that may already be localized, or a plain (locale-agnostic) value. */
export type Translatable<T = string> = T | Localized<T>;

function isLocalized<T>(value: Translatable<T>): value is Localized<T> {
  return (
    value !== null &&
    typeof value === "object" &&
    "es" in (value as Record<string, unknown>) &&
    "ca" in (value as Record<string, unknown>) &&
    "en" in (value as Record<string, unknown>)
  );
}

/** Resolves a Translatable to one locale. Usable from server and client code. */
export function pick<T>(value: Translatable<T>, locale: Locale): T {
  return isLocalized(value) ? value[locale] : (value as T);
}

/** Returns a `t()` bound to one locale, for components that render a single language. */
export function translator(locale: Locale) {
  return <T,>(value: Translatable<T>): T => pick(value, locale);
}
