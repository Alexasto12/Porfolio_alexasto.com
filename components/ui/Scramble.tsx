"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>{}=*";

type ScrambleProps = {
  text: string;
  /** Index of the first letter across the whole name, for the staggered entrance. */
  offset?: number;
  perChar?: number;
  className?: string;
};

/**
 * One letter per span (each with its index in --i, so CSS can stagger the
 * entrance). Hovering with a mouse scrambles the letters back into place;
 * touch, keyboard and reduced motion never trigger it. Screen readers get the
 * plain text.
 */
export function Scramble({ text, offset = 0, perChar = 30, className = "" }: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  const play = useCallback(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const total = text.length * perChar + 260;
    const tick = (now: number) => {
      const elapsed = now - start;
      const revealed = Math.floor(elapsed / perChar);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        out += i < revealed ? text[i] : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
      if (elapsed < total) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, perChar]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span className={className} onMouseEnter={play}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {Array.from(display).map((ch, i) => (
          <span key={i} className="ch" style={{ "--i": offset + i } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
