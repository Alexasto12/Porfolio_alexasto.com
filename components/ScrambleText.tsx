"use client";

import { useScramble } from "@/lib/useScramble";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  playOnMount?: boolean;
  perChar?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

export function ScrambleText({
  text,
  playOnMount,
  perChar,
  className,
}: Props) {
  const { ref, run } = useScramble(text, { playOnMount, perChar });
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
