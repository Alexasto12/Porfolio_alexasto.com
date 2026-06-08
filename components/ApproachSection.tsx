"use client";

import { motion, useReducedMotion } from "motion/react";
import { approach } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { staggerParent, clipUp, VIEWPORT } from "@/lib/motion";

/**
 * Content-only — the section chrome (number/label/title/summary + collapse)
 * is supplied by <CollapsibleSection> in the page.
 */
export function ApproachContent() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      variants={staggerParent(0.09)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
    >
      {approach.principles.map((p) => (
        <motion.li
          key={p.index}
          variants={clipUp}
          className="relative p-7 md:p-9 rounded-[8px] shadow-card"
          style={{
            background: "color-mix(in srgb, var(--ink) 2%, var(--paper))",
            border: "1px solid var(--line-strong)",
          }}
        >
          <span
            className="absolute -top-3.5 left-7 px-2 py-1 font-mono text-[10px] tabular tracking-[0.22em]"
            style={{
              background: "var(--paper)",
              color: "var(--wine)",
              border: "1px solid var(--line-strong)",
            }}
          >
            {p.index}
          </span>
          <h3
            key={`p-title-${p.index}-${locale}`}
            className="mt-3 font-display text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold leading-[1.14] tracking-[-0.015em]"
          >
            {t(p.title)}
          </h3>
          <p
            key={`p-body-${p.index}-${locale}`}
            className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-[48ch]"
            style={{ color: "var(--muted)" }}
          >
            {t(p.body)}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
