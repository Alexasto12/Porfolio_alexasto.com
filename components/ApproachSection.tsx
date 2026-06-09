"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import { approach } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function ApproachSection() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section id="enfoque" className="shell pt-28 md:pt-40 pb-24 md:pb-32">
      <SectionHeader
        number={approach.sectionNumber}
        label={approach.sectionLabel}
      />

      <ul className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
        {approach.principles.map((p, i) => (
          <motion.li
            key={p.index}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduced ? 0 : 0.65,
              delay: reduced ? 0 : i * 0.06,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="relative p-6 md:p-8 rounded-[8px] shadow-card"
            style={{
              background:
                "color-mix(in srgb, var(--ink) 2%, var(--paper))",
              border: "1px solid var(--line-strong)",
            }}
          >
            <span
              className="absolute -top-4 left-6 px-2 py-1 font-mono text-[10px] tabular tracking-[0.22em]"
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
              className="mt-3 font-display text-[clamp(1.35rem,2.6vw,1.8rem)] font-semibold leading-[1.15] tracking-[-0.015em]"
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
      </ul>
    </section>
  );
}
