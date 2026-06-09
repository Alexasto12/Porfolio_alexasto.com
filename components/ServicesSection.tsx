"use client";

import { motion, useReducedMotion } from "motion/react";
import { ParallaxNumber } from "./ParallaxNumber";
import { services } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function ServicesSection() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section id="servicios" className="shell">
      <details className="group">
        <summary className="list-none cursor-pointer outline-none pt-28 md:pt-40">
          {/* ── Fila número + toggle ── */}
          <div
            className="flex items-center justify-between gap-6 pb-6 md:pb-8"
            style={{ borderBottom: "2px solid var(--ink)" }}
          >
            <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
              <ParallaxNumber
                aria-hidden="true"
                className="font-display font-extrabold tabular leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,11vw,9.5rem)] section-number"
                style={{ color: "var(--ink)", opacity: 0.96 }}
              >
                {services.sectionNumber}
              </ParallaxNumber>
              <span
                key={`label-servicios-${locale}`}
                className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em]"
                style={{ color: "var(--muted)" }}
              >
                {t(services.sectionLabel)}
              </span>
            </div>

            {/* Toggle: centrado en el eje Y del número masivo */}
            <span
              aria-hidden="true"
              className="accordion-toggle shrink-0 font-mono font-bold text-[1.75rem] leading-none select-none"
              style={{ color: "var(--wine)" }}
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </div>

          {/* Título + descripción: siempre visibles */}
          <div className="mt-8 md:mt-12 grid grid-cols-4 gap-4 md:gap-8">
            <h2
              key={`h-servicios-${locale}`}
              className="col-span-4 md:col-span-3 font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,5.2vw,4.2rem)] max-w-[22ch]"
              style={{ color: "var(--ink)" }}
            >
              {t(services.heading)}
            </h2>
            <p
              key={`d-servicios-${locale}`}
              className="col-span-4 md:col-span-3 mt-2 md:mt-4 text-[15px] md:text-[17px] leading-[1.6] max-w-[62ch]"
              style={{ color: "var(--ink)" }}
            >
              {t(services.description)}
            </p>
          </div>
        </summary>

        {/* ── Cuerpo colapsable: grupos de servicios ── */}
        <div className="pb-24 md:pb-32">
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
        </div>
      </details>
    </section>
  );
}
