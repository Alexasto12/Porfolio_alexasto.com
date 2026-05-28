"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./Counter";
import { Ticker } from "./Ticker";
import { SectionHeader } from "./SectionHeader";
import { vmv } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function VmvBlock() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section
      id="experiencia"
      className="dark-block relative w-full mt-12 md:mt-20"
    >
      <div className="shell pt-24 md:pt-32 pb-16 md:pb-24">
        <SectionHeader
          number={vmv.sectionNumber}
          label={vmv.sectionLabel}
          title={vmv.heading}
          description={vmv.intro}
          dark
          meta={vmv.range}
          aside={
            <span
              className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-semibold tracking-[-0.01em]"
              style={{ color: "var(--paper-on-dark)" }}
            >
              {vmv.client}
            </span>
          }
        />

        {/* Cifras */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
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
              className="flex flex-col gap-3"
              style={{
                borderTop: "1px solid var(--line-dark)",
                paddingTop: "1.5rem",
              }}
            >
              <span
                className="font-display font-extrabold leading-[0.86] tracking-[-0.045em] text-[clamp(5rem,13vw,10rem)] hero-shadow"
                style={{ color: "var(--wine-bright)" }}
              >
                <Counter to={s.value} duration={1400} />
              </span>
              <span
                key={`l-${i}-${locale}`}
                className="font-display text-[clamp(1.05rem,1.8vw,1.35rem)]"
              >
                {t(s.label)}
              </span>
              <span
                key={`c-${i}-${locale}`}
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--muted-dark)" }}
              >
                {t(s.caption)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Capacidades */}
        <div className="mt-28 md:mt-36 grid grid-cols-4 gap-4 md:gap-8">
          <div className="col-span-4 md:col-span-1">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-dark)" }}
            >
              ↳ {t(vmv.capabilitiesLabel)}
            </div>
          </div>

          <ul className="col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
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
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[10px] tabular"
                      style={{ color: "var(--muted-dark)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      key={`cap-t-${i}-${locale}`}
                      className="font-display text-[clamp(1.15rem,2vw,1.5rem)] font-semibold leading-[1.18] tracking-[-0.01em]"
                    >
                      {t(cap.title)}
                    </h3>
                  </div>
                  {cap.badge ? (
                    <span
                      key={`badge-${i}-${locale}`}
                      className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 shrink-0 font-bold"
                      style={{
                        border: "1px solid var(--wine-bright)",
                        color: "var(--wine-bright)",
                      }}
                    >
                      {t(cap.badge)}
                    </span>
                  ) : null}
                </div>
                <p
                  key={`cap-d-${i}-${locale}`}
                  className="mt-3 text-[14px] md:text-[15px] leading-[1.65] max-w-[46ch]"
                  style={{ color: "var(--paper-on-dark)" }}
                >
                  {t(cap.description)}
                </p>
                {cap.link ? (
                  <a
                    href={cap.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] font-bold link-row"
                    style={{ color: "var(--paper-on-dark)" }}
                  >
                    <span
                      className="link-row__bar inline-block h-[2px] w-10 transition-all duration-500"
                      style={{ background: "var(--wine-bright)" }}
                    />
                    <span className="link-row__text">{cap.link.label}</span>
                  </a>
                ) : null}
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
