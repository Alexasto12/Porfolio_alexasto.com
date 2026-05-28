"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./Counter";
import { Ticker } from "./Ticker";
import { SectionHeader } from "./SectionHeader";
import { Browser } from "./Browser";
import { MockSalerm } from "./mocks/MockSalerm";
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
                style={{ color: "var(--wine)" }}
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

        {/* Salerm magazine showcase */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <Browser
              url="magazine.salerm.com / s / 7611600d…"
              badge={t({ es: "DEMO PÚBLICA", en: "PUBLIC DEMO", ca: "DEMO PÚBLICA" })}
              variant="light"
              ratio="16/10"
            >
              <MockSalerm />
            </Browser>
          </div>
          <div className="lg:col-span-5">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-dark)" }}
            >
              ↳ CASE · PUBLICLY ACCESSIBLE
            </div>
            <h3
              key={`salerm-h-${locale}`}
              className="mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.02em]"
            >
              {t({
                es: "Una de las piezas — pública.",
                en: "One of the pieces — public.",
                ca: "Una de les peces — pública.",
              })}
            </h3>
            <p
              key={`salerm-b-${locale}`}
              className="mt-5 text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-[44ch]"
              style={{ color: "var(--paper-on-dark)" }}
            >
              {t({
                es: "El visualizador interactivo de revistas que mantengo para VMV. Lectura protegida por token compartible: te paso un enlace y entras sin login.",
                en: "The interactive magazine viewer I maintain for VMV. Token-protected shareable reading: I send you a link and you're in, no login.",
                ca: "El visualitzador interactiu de revistes que mantinc per a VMV. Lectura protegida per token compartible: t'envio un enllaç i entres sense login.",
              })}
            </p>
            <a
              href="https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]"
              style={{ color: "var(--wine)" }}
            >
              <span
                className="inline-block h-px w-8"
                style={{ background: "var(--wine)" }}
              />
              magazine.salerm.com ↗
            </a>
          </div>
        </motion.div>

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
                      className="font-display text-[clamp(1.15rem,2vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.01em]"
                    >
                      {t(cap.title)}
                    </h3>
                  </div>
                  {cap.badge ? (
                    <span
                      key={`badge-${i}-${locale}`}
                      className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 shrink-0"
                      style={{
                        border: "1px solid var(--line-dark)",
                        color:
                          t(cap.badge) === "PÚBLICO" ||
                          t(cap.badge) === "PUBLIC" ||
                          t(cap.badge) === "PÚBLIC" ||
                          t(cap.badge) === "DEMO PÚBLICA" ||
                          t(cap.badge) === "PUBLIC DEMO"
                            ? "var(--wine)"
                            : "var(--muted-dark)",
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
                    className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] link-underline"
                    style={{ color: "var(--wine)" }}
                  >
                    {cap.link.label}
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
