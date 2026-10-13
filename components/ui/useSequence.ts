"use client";

import { useEffect, useRef, useState } from "react";
import { loadMotion } from "./loadMotion";

/**
 * "final": complete, as the server rendered it (no JS yet, reduced motion, or
 * it was already on screen). "hidden": reset while still off screen, once the
 * motion features are loaded. "play": runs once when it scrolls into view.
 */
export type SequencePhase = "final" | "hidden" | "play";

export function useSequence<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<SequencePhase>("final");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (onScreen()) return;
    let io: IntersectionObserver | null = null;
    let cancelled = false;
    loadMotion().then(() => {
      // One frame later LazyMotion has rendered with the features in place.
      requestAnimationFrame(() => {
        if (cancelled || onScreen()) return;
        setPhase("hidden");
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              setPhase("play");
              io?.disconnect();
            }
          },
          { threshold }
        );
        io.observe(el);
      });
    });
    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, [threshold]);

  return [ref, phase] as const;
}
