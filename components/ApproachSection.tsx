"use client";

import { motion, useReducedMotion } from "motion/react";
import { approach } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function ApproachSection() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section id="enfoque" className="shell relative pt-6 pb-24 md:pb-32">
      <div
        className="border-t pt-12 md:pt-16"
        style={{ borderColor: "var(--line-strong)" }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="grid grid-cols-4 gap-4 md:gap-8 items-baseline"
        >
          <div
            className="col-span-4 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted)" }}
          >
            {t(approach.sectionLabel)}
          </div>
          <h2
            key={`approach-heading-${locale}`}
            className="col-span-4 md:col-span-3 font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-[clamp(1.8rem,4.4vw,3.2rem)] max-w-[24ch]"
          >
            {t(approach.heading)}
          </h2>
        </motion.div>

        <ul className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
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
              className="pt-5"
              style={{ borderTop: "1px solid var(--line-strong)" }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-[11px] tabular"
                  style={{ color: "var(--wine)" }}
                >
                  {p.index}
                </span>
                <h3
                  key={`p-title-${p.index}-${locale}`}
                  className="font-display text-[clamp(1.25rem,2.4vw,1.7rem)] font-semibold leading-[1.15] tracking-[-0.01em]"
                >
                  {t(p.title)}
                </h3>
              </div>
              <p
                key={`p-body-${p.index}-${locale}`}
                className="mt-3 text-[14px] md:text-[15px] leading-[1.6] max-w-[44ch]"
                style={{ color: "var(--muted)" }}
              >
                {t(p.body)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
