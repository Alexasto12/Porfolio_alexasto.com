"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CardsLayout = "stack" | "split" | "list";
export type TimelineMode = "rail" | "compact";
/** [base, bright] accent pair applied to --tw-accent / --tw-accent-bright. */
export type Accent = [string, string];

export interface TweakValues {
  accent: Accent;
  cards: CardsLayout;
  timeline: TimelineMode;
  grid: boolean;
}

export const TWEAK_DEFAULTS: TweakValues = {
  accent: ["#c12c52", "#e24a72"],
  cards: "stack",
  timeline: "rail",
  grid: true,
};

export const ACCENT_OPTIONS: Accent[] = [
  ["#c12c52", "#e24a72"],
  ["#a01f43", "#c93a60"],
  ["#c2622c", "#e2884a"],
  ["#2c6ac1", "#4a8ae2"],
];

const STORAGE_KEY = "ac_tweaks";

type TweaksContextValue = {
  tweaks: TweakValues;
  setTweak: <K extends keyof TweakValues>(key: K, value: TweakValues[K]) => void;
};

const TweaksContext = createContext<TweaksContextValue>({
  tweaks: TWEAK_DEFAULTS,
  setTweak: () => {},
});

export const useTweaks = () => useContext(TweaksContext);

export function TweaksProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, setTweaks] = useState<TweakValues>(TWEAK_DEFAULTS);

  // Hydrate persisted tweaks after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setTweaks((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  const setTweak = useCallback<TweaksContextValue["setTweak"]>((key, value) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Apply accent to CSS custom properties.
  useEffect(() => {
    const root = document.documentElement;
    const [base, bright] = tweaks.accent;
    root.style.setProperty("--tw-accent", base);
    root.style.setProperty("--tw-accent-bright", bright || base);
  }, [tweaks.accent]);

  // Global safety sweep: reveal any in-view element whose IntersectionObserver
  // never fired (embedded/offscreen render contexts). Removes the .pre hide class.
  useEffect(() => {
    const sweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>(".reveal.pre").forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.96) el.classList.remove("pre");
      });
    };
    const raf = requestAnimationFrame(sweep);
    const t1 = setTimeout(sweep, 300);
    const t2 = setTimeout(sweep, 900);
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
  }, []);

  const value = useMemo<TweaksContextValue>(
    () => ({ tweaks, setTweak }),
    [tweaks, setTweak]
  );

  return <TweaksContext.Provider value={value}>{children}</TweaksContext.Provider>;
}
