"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./Counter";
import { Sparkline } from "./Sparkline";
import { neibr } from "@/data/projects";

export function NeibrFeature() {
  const reduced = useReducedMotion();

  return (
    <section id="neibr" className="shell relative pt-6 pb-24 md:pb-36">
      <div
        className="border-t pt-10 md:pt-16"
        style={{ borderColor: "var(--line-strong)" }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-baseline justify-between gap-4 flex-wrap"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
            {neibr.sectionLabel}
          </div>
          <a
            href={neibr.link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--wine)" }}
          >
            {neibr.domain} ↗
          </a>
        </motion.div>

        <div className="mt-10 grid grid-cols-4 gap-4 md:gap-8">
          {/* Título + descripción */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-4 md:col-span-2"
          >
            <h2 className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] text-[clamp(2.4rem,7.5vw,5.5rem)]">
              {neibr.title}
            </h2>
            <p className="mt-6 text-[15px] md:text-[16.5px] leading-[1.55] max-w-[44ch]">
              {neibr.description}
            </p>

            <ul className="mt-7 space-y-1.5 font-mono text-[12px]" style={{ color: "var(--ink)" }}>
              {neibr.concepts.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="text-[var(--wine)]">→</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {neibr.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-[4px]"
                  style={{
                    border: "1px solid var(--line-strong)",
                    color: "var(--ink)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stat estrella */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
            className="col-span-4 md:col-span-2 md:col-start-3 md:pl-6"
          >
            <div
              className="p-6 md:p-8 rounded-[6px] flex flex-col h-full"
              style={{
                background:
                  "color-mix(in srgb, var(--ink) 4%, transparent)",
                border: "1px solid var(--line-strong)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
                STRESS TEST · OUTPUT
              </div>

              <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] text-[clamp(3rem,9vw,6.2rem)]"
                  style={{ color: "var(--wine)" }}
                >
                  <Counter to={neibr.stat.value} duration={1800} />
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  {neibr.stat.valueLabel}
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold">
                  {neibr.stat.duration}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  duración
                </span>
              </div>

              <p className="mt-5 text-[13px] leading-[1.55]" style={{ color: "var(--muted)" }}>
                {neibr.stat.caption}
              </p>

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                <Sparkline />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
