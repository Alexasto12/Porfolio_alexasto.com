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
  LOCALES,
  type Locale,
  type Localized,
} from "./i18n-types";

export {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_FULL,
  l,
  type Locale,
  type Localized,
} from "./i18n-types";

const STORAGE_KEY = "alexasto.locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: <T>(value: Localized<T>) => T;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitial(): Locale {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (LOCALES as string[]).includes(stored)) return stored;
  } catch {}
  if (typeof navigator !== "undefined") {
    const lang = (navigator.language || "es").toLowerCase();
    if (lang.startsWith("ca")) return "ca";
    if (lang.startsWith("en")) return "en";
  }
  return "es";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(detectInitial());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: <T,>(v: Localized<T>) => v[locale],
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
