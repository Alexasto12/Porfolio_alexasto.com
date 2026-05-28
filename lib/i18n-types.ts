export type Locale = "es" | "en" | "ca";

export const LOCALES: Locale[] = ["es", "en", "ca"];

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  ca: "CA",
};

export const LOCALE_FULL: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
};

export type Localized<T = string> = Record<Locale, T>;

export const l = <T>(es: T, en: T, ca: T): Localized<T> => ({ es, en, ca });
