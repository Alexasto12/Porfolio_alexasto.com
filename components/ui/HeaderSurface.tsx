"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps the header's data-surface in step with the surface under it. An
 * IntersectionObserver watches a one-pixel line through the middle of the
 * header; the smallest surface crossing it (a band inside a section wins over
 * the section) gives the header its tokens. Renders nothing.
 */
export function HeaderSurface() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = ref.current?.closest<HTMLElement>(".site-header");
    if (!header) return;
    // Full-width surfaces only: sections, the stress band and the footer (not cards).
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main .sec[data-surface], main .stress[data-surface], footer[data-surface]")
    );
    const crossing = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null;

    const apply = () => {
      let pick: HTMLElement | null = null;
      for (const el of crossing) if (!pick || el.offsetHeight < pick.offsetHeight) pick = el;
      header.dataset.surface = pick?.dataset.surface ?? "paper";
    };
    const observe = () => {
      io?.disconnect();
      crossing.clear();
      const line = Math.round(header.offsetHeight / 2);
      const below = Math.max(0, window.innerHeight - line - 1);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) crossing.add(e.target as HTMLElement);
            else crossing.delete(e.target as HTMLElement);
          }
          apply();
        },
        { rootMargin: `-${line}px 0px -${below}px 0px` }
      );
      targets.forEach((t) => io!.observe(t));
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);

  return <span ref={ref} hidden />;
}
