"use client";

import { useCallback, useEffect, useRef } from "react";

const POOL =
  "{}[]()<>/=;:_+-*&|.0123456789funcasyncchanvarGoJavaNode".split("");

const rnd = () => POOL[(Math.random() * POOL.length) | 0];

export function useScramble(
  text: string,
  opts?: { playOnMount?: boolean; perChar?: number }
) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion.current) {
      el.textContent = text;
      return;
    }
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const perChar = opts?.perChar ?? 26;
    const settle = perChar * 1.2;
    const frame = (now: number) => {
      const t = now - start;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
          continue;
        }
        const reveal = i * perChar;
        out += t >= reveal + settle ? text[i] : rnd();
      }
      el.textContent = out;
      if (t < text.length * perChar + settle) {
        raf.current = requestAnimationFrame(frame);
      } else {
        el.textContent = text;
      }
    };
    raf.current = requestAnimationFrame(frame);
  }, [text, opts?.perChar]);

  useEffect(() => {
    if (opts?.playOnMount) run();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, opts?.playOnMount]);

  return { ref, run };
}
