"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  /** Short caption rendered inside the placeholder. */
  label?: string;
  /** Hint about what the eventual screenshot should depict. */
  hint?: string;
  /** Aspect ratio passed straight to CSS. */
  ratio?: string;
  /** Dark or light surface tone. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Drop-in placeholder for project screenshots. The user will swap each one
 * for a real image; this keeps the layout intact without claiming visuals
 * we do not have.
 */
export function ShotPlaceholder({
  label,
  hint,
  ratio = "16 / 10",
  variant = "light",
  className,
}: Props) {
  const reduced = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "relative w-full overflow-hidden rounded-[10px] shadow-window",
        className
      )}
      style={{
        aspectRatio: ratio,
        background: isDark
          ? "linear-gradient(135deg,#15140f 0%, #1d1c16 100%)"
          : "linear-gradient(135deg, color-mix(in srgb, var(--ink) 4%, var(--paper)) 0%, color-mix(in srgb, var(--ink) 1%, var(--paper)) 100%)",
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.10)" : "var(--line-strong)"
        }`,
      }}
    >
      {/* Subtle diagonal hatching to mark the area as "image goes here" */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diag-hatch"
            patternUnits="userSpaceOnUse"
            width="14"
            height="14"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="14"
              stroke={isDark ? "#ffffff" : "currentColor"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-hatch)" />
      </svg>

      {/* Frame corners */}
      {[0, 1, 2, 3].map((corner) => {
        const isTop = corner < 2;
        const isLeft = corner % 2 === 0;
        return (
          <span
            key={corner}
            aria-hidden="true"
            className="absolute h-3 w-3"
            style={{
              top: isTop ? 14 : undefined,
              bottom: !isTop ? 14 : undefined,
              left: isLeft ? 14 : undefined,
              right: !isLeft ? 14 : undefined,
              borderTop: isTop
                ? `1px solid ${isDark ? "rgba(255,255,255,0.45)" : "var(--ink)"}`
                : undefined,
              borderBottom: !isTop
                ? `1px solid ${isDark ? "rgba(255,255,255,0.45)" : "var(--ink)"}`
                : undefined,
              borderLeft: isLeft
                ? `1px solid ${isDark ? "rgba(255,255,255,0.45)" : "var(--ink)"}`
                : undefined,
              borderRight: !isLeft
                ? `1px solid ${isDark ? "rgba(255,255,255,0.45)" : "var(--ink)"}`
                : undefined,
            }}
          />
        );
      })}

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: isDark ? "var(--muted-dark)" : "var(--muted)" }}
        >
          ↳ {hint ?? "screenshot"}
        </span>
        {label ? (
          <span
            className="font-display text-[clamp(0.95rem,1.8vw,1.2rem)] font-semibold tracking-[-0.01em]"
            style={{ color: isDark ? "var(--paper-on-dark)" : "var(--ink)" }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
