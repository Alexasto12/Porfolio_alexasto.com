"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>{}=*";

type ScrambleProps = {
  text: string;
  perChar?: number;
  className?: string;
  style?: CSSProperties;
};

/** Scramble-in text effect; replays on hover. */
export function Scramble({ text, perChar = 34, className = "", style }: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const total = text.length * perChar + 260;
    const tick = (now: number) => {
      const elapsed = now - start;
      const revealCount = Math.floor(elapsed / perChar);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
          continue;
        }
        if (i < revealCount) out += text[i];
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
      if (elapsed < total) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, perChar]);

  useEffect(() => {
    play();
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  return (
    <span className={className} style={style} onMouseEnter={play} aria-label={text}>
      {display}
    </span>
  );
}
