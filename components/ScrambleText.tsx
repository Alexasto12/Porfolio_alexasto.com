"use client";

import { useEffect } from "react";
import { useScramble } from "@/lib/useScramble";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  playOnMount?: boolean;
  perChar?: number;
  className?: string;
  replayKey?: string | number;
};

/**
 * `replayKey` lets you re-run the scramble when an external value changes
 * (for example, when the active locale changes).
 */
export function ScrambleText({
  text,
  playOnMount,
  perChar,
  className,
  replayKey,
}: Props) {
  const { ref, run } = useScramble(text, { playOnMount, perChar });

  useEffect(() => {
    if (replayKey === undefined) return;
    run();
  }, [replayKey, run]);

  return (
    <span
      ref={ref}
      onMouseEnter={run}
      onFocus={run}
      tabIndex={0}
      aria-label={text}
      className={cn("inline-block cursor-default outline-none", className)}
    >
      {text}
    </span>
  );
}
