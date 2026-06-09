"use client";

import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import type { TimelineEntry } from "@/data/projects";

type Props = {
  entries: readonly TimelineEntry[];
};

const KIND_DOT: Record<NonNullable<TimelineEntry["kind"]>, string> = {
  milestone: "var(--wine)",
  education: "var(--ink)",
  work: "var(--wine)",
  project: "var(--ink)",
};

export function Timeline({ entries }: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  const resolveYear = (y: TimelineEntry["year"]) =>
    typeof y === "string" ? y : t(y);

  return (
    <ol className="mt-12 md:mt-16 relative">
      {entries.map((e, i) => (
        <motion.li
          key={`${i}`}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduced ? 0 : 0.55,
            delay: reduced ? 0 : i * 0.05,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="relative grid grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-16 last:pb-0"
        >
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 hidden md:block"
            style={{
              left: "calc(25% + 0.75rem)",
              width: "1px",
              background: "var(--line-strong)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute md:hidden left-3 top-0 bottom-0"
            style={{ width: "1px", background: "var(--line-strong)" }}
          />

          <div className="col-span-4 md:col-span-1 pl-7 md:pl-0 flex items-baseline md:justify-end md:pr-6">
            <span
              className="font-display font-extrabold leading-none tracking-[-0.03em] text-[clamp(1.8rem,3.5vw,2.6rem)]"
              style={{ color: "var(--ink)" }}
            >
              {resolveYear(e.year)}
            </span>
          </div>

          {/* Dot */}
          <span
            aria-hidden="true"
            className="absolute hidden md:block h-3 w-3 rounded-full"
            style={{
              left: "calc(25% + 0.75rem)",
              top: "0.95rem",
              transform: "translateX(-50%)",
              background: KIND_DOT[e.kind ?? "work"],
              boxShadow: "0 0 0 4px var(--paper)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute md:hidden h-3 w-3 rounded-full"
            style={{
              left: "0.75rem",
              top: "0.6rem",
              transform: "translateX(-50%)",
              background: KIND_DOT[e.kind ?? "work"],
              boxShadow: "0 0 0 4px var(--paper)",
            }}
          />

          <div className="col-span-4 md:col-span-3 pl-7 md:pl-8">
            <h3
              key={`tl-t-${i}-${locale}`}
              className="font-display text-[clamp(1.2rem,2.2vw,1.55rem)] font-semibold leading-[1.2] tracking-[-0.01em]"
            >
              {t(e.title)}
            </h3>
            <div
              key={`tl-p-${i}-${locale}`}
              className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--wine)" }}
            >
              {t(e.place)}
            </div>
            <p
              key={`tl-b-${i}-${locale}`}
              className="mt-3 text-[14px] md:text-[15px] leading-[1.65] max-w-[64ch]"
              style={{ color: "var(--ink)" }}
            >
              {t(e.body)}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
