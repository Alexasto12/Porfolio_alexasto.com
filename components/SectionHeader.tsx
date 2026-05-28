"use client";

import { motion, useReducedMotion } from "motion/react";
import { useI18n, type Localized } from "@/lib/i18n";
import { ParallaxNumber } from "./ParallaxNumber";

type Props = {
  number: string;
  label: Localized<string>;
  title?: Localized<string>;
  description?: Localized<string>;
  meta?: Localized<string>;
  dark?: boolean;
  /** Extra slot rendered in the top-right corner */
  aside?: React.ReactNode;
};

export function SectionHeader({
  number,
  label,
  title,
  description,
  meta,
  dark,
  aside,
}: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  const muted = dark ? "var(--muted-dark)" : "var(--muted)";
  const lineCol = dark ? "var(--line-dark)" : "var(--line-strong)";
  const ink = dark ? "var(--paper-on-dark)" : "var(--ink)";

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative"
    >
      <div
        className="flex items-end justify-between gap-6 pb-6 md:pb-8"
        style={{ borderBottom: `1px solid ${lineCol}` }}
      >
        <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
          <ParallaxNumber
            aria-hidden="true"
            className="font-display font-extrabold tabular leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,11vw,9.5rem)] section-number"
            style={{
              color: dark ? "var(--paper-on-dark)" : "var(--ink)",
              opacity: dark ? 0.92 : 0.96,
            }}
          >
            {number}
          </ParallaxNumber>
          <span
            key={`label-${number}-${locale}`}
            className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em]"
            style={{ color: muted }}
          >
            {t(label)}
          </span>
        </div>
        {aside ? <div className="shrink-0 text-right">{aside}</div> : null}
      </div>

      {(title || description || meta) && (
        <div className="mt-8 md:mt-12 grid grid-cols-4 gap-4 md:gap-8 items-start">
          {title ? (
            <h2
              key={`h-${number}-${locale}`}
              className="col-span-4 md:col-span-3 font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,5.2vw,4.2rem)] max-w-[22ch]"
              style={{ color: ink }}
            >
              {t(title)}
            </h2>
          ) : null}
          {meta ? (
            <div
              className="col-span-4 md:col-span-1 md:text-right font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: muted }}
            >
              {t(meta)}
            </div>
          ) : null}
          {description ? (
            <p
              key={`d-${number}-${locale}`}
              className="col-span-4 md:col-span-3 md:col-start-1 mt-2 md:mt-4 text-[15px] md:text-[17px] leading-[1.6] max-w-[62ch]"
              style={{ color: dark ? "var(--paper-on-dark)" : "var(--ink)" }}
            >
              {t(description)}
            </p>
          ) : null}
        </div>
      )}
    </motion.header>
  );
}
