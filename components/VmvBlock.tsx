"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./Counter";
import { Ticker } from "./Ticker";
import { vmv } from "@/data/projects";

export function VmvBlock() {
  const reduced = useReducedMotion();

  return (
    <section
      id="experiencia"
      className="dark-block relative w-full mt-8 md:mt-12"
    >
      <div className="shell pt-20 md:pt-28 pb-12 md:pb-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-baseline justify-between gap-4 flex-wrap"
        >
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-dark)" }}
          >
            {vmv.sectionLabel} · {vmv.client}
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-dark)" }}
          >
            BLOQUE TÉCNICO
          </div>
        </motion.div>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5.6vw,4.2rem)] max-w-[20ch]"
        >
          {vmv.heading}
        </motion.h2>

        {/* Cifras */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {vmv.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: 0.12 + i * 0.08,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="flex flex-col gap-2"
              style={{
                borderTop: "1px solid var(--line-dark)",
                paddingTop: "1.25rem",
              }}
            >
              <span
                className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] text-[clamp(4.5rem,12vw,9rem)]"
                style={{ color: "var(--wine)" }}
              >
                <Counter to={s.value} duration={1400} />
              </span>
              <span className="font-display text-[clamp(1rem,1.6vw,1.2rem)]">
                {s.label}
              </span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--muted-dark)" }}
              >
                {s.caption}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Capacidades */}
        <div className="mt-20 md:mt-28 grid grid-cols-4 gap-4 md:gap-8">
          <div className="col-span-4 md:col-span-1">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-dark)" }}
            >
              CAPACIDADES
            </div>
          </div>

          <ul className="col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {vmv.capabilities.map((cap, i) => (
              <motion.li
                key={cap.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.04 * i,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                className="pt-5"
                style={{ borderTop: "1px solid var(--line-dark)" }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: "var(--muted-dark)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.1rem,2vw,1.45rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
                    {cap.title}
                  </h3>
                </div>
                <p
                  className="mt-2.5 text-[14px] md:text-[15px] leading-[1.55] max-w-[42ch]"
                  style={{ color: "var(--paper-on-dark)" }}
                >
                  {cap.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="w-full"
        style={{ borderTop: "1px solid var(--line-dark)" }}
      >
        <Ticker items={vmv.ticker} />
      </div>
    </section>
  );
}
