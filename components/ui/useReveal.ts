"use client";

import { useLayoutEffect, useRef } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * Scroll-reveal hook. Adds a `.pre` class before first paint (transform-only
 * hide), then removes it once the element scrolls into view. Content is always
 * visible if IntersectionObserver / rAF are unavailable (offscreen capture).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  opts: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // base = visible
    el.classList.add("pre"); // hide before first paint
    const reveal = () => el.classList.remove("pre");
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92;
    };
    let io: IntersectionObserver | null = null;
    let fallback = 0 as unknown as ReturnType<typeof setTimeout>;
    const raf = requestAnimationFrame(() => {
      if (inView()) {
        requestAnimationFrame(reveal);
        return;
      }
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              reveal();
              io?.disconnect();
            }
          }),
        {
          threshold: opts.threshold ?? 0.16,
          rootMargin: opts.rootMargin ?? "0px 0px -8% 0px",
        }
      );
      io.observe(el);
      fallback = setTimeout(reveal, 1600); // safety net
    });
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
