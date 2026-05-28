"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const HEIGHTS = [
  18, 26, 22, 38, 34, 48, 42, 58, 54, 72, 64, 86, 78, 96, 88, 100, 92, 78, 84,
  70, 76, 60, 66, 54,
];

export function Sparkline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end gap-[3px] h-16 sm:h-20">
        {HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            initial={reduced ? { scaleY: h / 100, opacity: 1 } : { scaleY: 0, opacity: 0.4 }}
            animate={inView || reduced ? { scaleY: h / 100, opacity: 1 } : {}}
            transition={{
              duration: reduced ? 0 : 0.55,
              delay: reduced ? 0 : i * 0.025,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            style={{
              transformOrigin: "bottom",
              height: "100%",
              background:
                i === HEIGHTS.length - 1
                  ? "var(--wine)"
                  : "color-mix(in srgb, var(--ink) 78%, transparent)",
            }}
            className="flex-1 rounded-[1px]"
          />
        ))}
      </div>
      <div
        className="mt-2 flex justify-between font-mono text-[10px]"
        style={{ color: "var(--muted)" }}
      >
        <span>req/s</span>
        <span>t = 50min</span>
      </div>
    </div>
  );
}
