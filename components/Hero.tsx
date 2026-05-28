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
      className="shell relative pt-16 sm:pt-20 md:pt-28 pb-20 md:pb-36"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex items-baseline justify-between gap-4"
      >
        <div
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
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

      <div className="mt-10 md:mt-14 grid grid-cols-4 gap-4 md:gap-6">
        {/* Nombre — columnas 1–4 */}
        <h1 className="col-span-4 font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-[clamp(3.4rem,11vw,11.5rem)]">
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

        {/* Intro — 2 columnas */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.5,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="col-span-4 md:col-span-2 md:col-start-1 mt-12 md:mt-20 max-w-[44ch]"
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
            style={{ color: "var(--muted)" }}
          >
            {t(hero.contextLabel)}
          </div>
          <p
            key={`intro-${locale}`}
            className="text-[15px] md:text-[17px] leading-[1.6]"
            style={{ color: "var(--ink)" }}
          >
            {t(hero.intro)}
          </p>
          <p
            key={`intro2-${locale}`}
            className="mt-4 text-[14px] md:text-[15px] leading-[1.6]"
            style={{ color: "var(--muted)" }}
          >
            {t(hero.intro2)}
          </p>
        </motion.div>

        {/* Stack — columna 4 */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.6,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="col-span-4 md:col-span-1 md:col-start-4 mt-2 md:mt-20 flex flex-col gap-2"
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted)" }}
          >
            {t(hero.stackLabel)}
          </div>
          <ul
            className="font-mono text-[12px] space-y-1.5"
            style={{ color: "var(--ink)" }}
          >
            {hero.stack.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span style={{ color: "var(--wine)" }}>/</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
