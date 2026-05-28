"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "./ScrambleText";
import { hero } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section
      id="perfil"
      className="shell relative pt-16 sm:pt-24 md:pt-32 pb-24 md:pb-40"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex items-baseline justify-between gap-4"
      >
        <div
          className="font-mono text-[11px] uppercase tracking-[0.24em]"
          style={{ color: "var(--muted)" }}
        >
          {t(hero.sectionLabel)}
        </div>
        <div
          className="hidden sm:block font-mono text-[10px]"
          style={{ color: "var(--muted)" }}
        >
          {t(hero.sectionHint)}
        </div>
      </motion.div>

      {/* Nombre */}
      <h1 className="mt-10 md:mt-14 font-display font-extrabold leading-[0.86] tracking-[-0.045em] text-[clamp(3.8rem,13vw,13rem)] hero-shadow">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="block"
          style={{ color: "var(--ink)" }}
        >
          <ScrambleText text={hero.firstName} playOnMount perChar={32} />
        </motion.span>
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.26,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="block"
          style={{ color: "var(--wine)" }}
        >
          <ScrambleText text={hero.lastName} playOnMount perChar={32} />
        </motion.span>
      </h1>

      {/* Tagline */}
      <motion.p
        key={`tagline-${locale}`}
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.45,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        className="mt-8 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold tracking-[-0.02em]"
        style={{ color: "var(--ink)" }}
      >
        {t(hero.tagline)}
      </motion.p>

      <div className="mt-10 md:mt-14 grid grid-cols-4 gap-6 md:gap-10">
        {/* Intro */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.55,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="col-span-4 md:col-span-2 max-w-[48ch]"
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            ↓ {t(hero.contextLabel)}
          </div>
          <p
            key={`intro-${locale}`}
            className="text-[16px] md:text-[18px] leading-[1.6] font-medium"
            style={{ color: "var(--ink)" }}
          >
            {t(hero.intro)}
          </p>
          <p
            key={`intro2-${locale}`}
            className="mt-5 text-[14px] md:text-[15px] leading-[1.65]"
            style={{ color: "var(--muted)" }}
          >
            {t(hero.intro2)}
          </p>
        </motion.div>

        {/* Stack + ratings */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.65,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="col-span-4 md:col-span-2 md:col-start-3 flex flex-col gap-8"
        >
          <div>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
              style={{ color: "var(--muted)" }}
            >
              ↳ {t(hero.stackLabel)}
            </div>
            <ul className="font-mono text-[13px] space-y-2" style={{ color: "var(--ink)" }}>
              {hero.stack.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span style={{ color: "var(--wine)" }}>/</span>
                  <span style={{ color: s.weight === "secondary" ? "var(--muted)" : "var(--ink)" }}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-5" style={{ borderColor: "var(--line-strong)" }}>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
              style={{ color: "var(--muted)" }}
            >
              ↳ SELF · X/10
            </div>
            <ul className="space-y-2.5">
              {hero.ratings.map((r) => (
                <li key={r.label.es} className="flex items-center gap-3">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-3 w-[3px]"
                        style={{
                          background:
                            i < r.value
                              ? "var(--wine)"
                              : "color-mix(in srgb, var(--ink) 12%, transparent)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    key={`${r.label.es}-${locale}`}
                    className="font-mono text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--ink)" }}
                  >
                    {t(r.label)}
                  </span>
                  <span
                    className="font-mono text-[11px] tabular ml-auto"
                    style={{ color: "var(--wine)" }}
                  >
                    {r.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
