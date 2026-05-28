"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./Counter";
import { Ticker } from "./Ticker";
import { vmv } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function VmvBlock() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section
      id="experiencia"
      className="dark-block relative w-full mt-10 md:mt-16"
    >
      <div className="shell pt-24 md:pt-36 pb-16 md:pb-24">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-baseline justify-between gap-4 flex-wrap"
        >
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-dark)" }}
          >
            {t(vmv.sectionLabel)} · {vmv.client}
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-dark)" }}
          >
            {t(vmv.bracketLabel)}
          </div>
        </motion.div>

        <motion.h2
          key={`vmv-h-${locale}`}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduced ? 0 : 0.75,
            delay: reduced ? 0 : 0.05,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-10 md:mt-12 font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2.2rem,6vw,4.6rem)] max-w-[22ch]"
        >
          {t(vmv.heading)}
        </motion.h2>

        <motion.p
          key={`vmv-i-${locale}`}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.15,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-6 md:mt-8 text-[15px] md:text-[17px] leading-[1.6] max-w-[58ch]"
          style={{ color: "var(--paper-on-dark)" }}
        >
          {t(vmv.intro)}
        </motion.p>

        {/* Cifras */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {vmv.stats.map((s, i) => (
            <motion.div
              key={`stat-${i}`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduced ? 0 : 0.7,
                delay: reduced ? 0 : 0.12 + i * 0.08,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="flex flex-col gap-2"
              style={{
                borderTop: "1px solid var(--line-dark)",
                paddingTop: "1.25rem",
              }}
            >
              <span
                className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] text-[clamp(4.5rem,12vw,9.5rem)]"
                style={{ color: "var(--wine)" }}
              >
                <Counter to={s.value} duration={1400} />
              </span>
              <span
                key={`l-${i}-${locale}`}
                className="font-display text-[clamp(1rem,1.6vw,1.25rem)]"
              >
                {t(s.label)}
              </span>
              <span
                key={`c-${i}-${locale}`}
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--muted-dark)" }}
              >
                {t(s.caption)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Capacidades */}
        <div className="mt-24 md:mt-32 grid grid-cols-4 gap-4 md:gap-8">
          <div className="col-span-4 md:col-span-1">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-dark)" }}
            >
              {t(vmv.capabilitiesLabel)}
            </div>
          </div>

          <ul className="col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-14">
            {vmv.capabilities.map((cap, i) => (
              <motion.li
                key={`cap-${i}`}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  delay: reduced ? 0 : 0.04 * i,
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
                  <h3
                    key={`cap-t-${i}-${locale}`}
                    className="font-display text-[clamp(1.1rem,2vw,1.45rem)] font-semibold leading-[1.15] tracking-[-0.01em]"
                  >
                    {t(cap.title)}
                  </h3>
                </div>
                <p
                  key={`cap-d-${i}-${locale}`}
                  className="mt-3 text-[14px] md:text-[15px] leading-[1.6] max-w-[44ch]"
                  style={{ color: "var(--paper-on-dark)" }}
                >
                  {t(cap.description)}
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
