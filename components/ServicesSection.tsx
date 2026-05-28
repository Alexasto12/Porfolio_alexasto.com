"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import { services } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function ServicesSection() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section
      id="servicios"
      className="shell pt-28 md:pt-40 pb-24 md:pb-32"
    >
      <SectionHeader
        number={services.sectionNumber}
        label={services.sectionLabel}
        title={services.heading}
        description={services.description}
      />

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
        {services.groups.map((group, i) => (
          <motion.div
            key={`g-${i}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduced ? 0 : 0.65,
              delay: reduced ? 0 : i * 0.06,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="pt-6"
            style={{ borderTop: "2px solid var(--ink)" }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3
                key={`g-t-${i}-${locale}`}
                className="font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-[1.15] tracking-[-0.015em]"
              >
                {t(group.group)}
              </h3>
              <span
                className="font-mono text-[11px] tabular"
                style={{ color: "var(--wine)" }}
              >
                {String(i + 1).padStart(2, "0")} / {String(services.groups.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {group.items.map((item, j) => (
                <motion.li
                  key={`it-${i}-${j}-${locale}`}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: reduced ? 0 : 0.45,
                    delay: reduced ? 0 : 0.05 + j * 0.04,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                  className="flex items-baseline gap-3 pb-3"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <span
                    className="font-mono text-[11px] tabular"
                    style={{ color: "var(--muted)" }}
                  >
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14.5px] md:text-[15.5px] leading-[1.5] font-medium">
                    {t(item)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-16 md:mt-20"
      >
        <a
          href={services.cta.href}
          className="inline-flex items-center gap-4 font-display text-[clamp(1.2rem,2.4vw,1.8rem)] font-semibold tracking-[-0.01em] link-cta-big"
          style={{ color: "var(--ink)" }}
        >
          <span
            className="inline-block h-[2px] w-12 transition-all duration-500"
            style={{ background: "var(--wine)" }}
          />
          <span>{t(services.cta.label)}</span>
        </a>
      </motion.div>
    </section>
  );
}
