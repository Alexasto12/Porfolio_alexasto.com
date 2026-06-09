"use client";

import { useReveal } from "./useReveal";

type BarsProps = {
  count?: number;
  seed?: number;
};

/** Deterministic sparkline with an upward stress-test ramp. */
export function Bars({ count = 34, seed = 7 }: BarsProps) {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.3 });
  const heights: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const ramp = 0.35 + (i / count) * 0.5;
    heights.push(Math.max(0.12, Math.min(1, ramp + (r - 0.5) * 0.4)));
  }
  return (
    <div ref={ref} className="bars reveal">
      {heights.map((h, i) => (
        <i key={i} style={{ height: `${h * 100}%`, animationDelay: `${i * 22}ms` }} />
      ))}
    </div>
  );
}
