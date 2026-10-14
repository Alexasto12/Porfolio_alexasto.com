"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "final": complete, as the server rendered it (no JS yet, reduced motion, or
 * it was already on screen). "hidden": reset while still off screen. "play":
 * runs once when it scrolls into view. The phase goes to data-phase and CSS
 * does the rest (transitions with per-element delays).
 */
export type SequencePhase = "final" | "hidden" | "play";

export function useSequence<T extends Element>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<SequencePhase>("final");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setPhase("hidden");
    // Plays once its top passes the lower quarter of the screen, whatever its height.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // One frame in the hidden state first, so the transitions have a start.
          requestAnimationFrame(() => setPhase("play"));
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(el);
    // Printing never scrolls: show it complete.
    const print = () => {
      io.disconnect();
      setPhase("final");
    };
    window.addEventListener("beforeprint", print);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", print);
    };
  }, []);

  return [ref, phase] as const;
}
