"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "./ScrambleText";
import { hero } from "@/data/projects";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="perfil"
      className="shell relative pt-12 sm:pt-16 md:pt-24 pb-16 md:pb-28"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex items-baseline justify-between gap-4"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] muted" style={{ color: "var(--muted)" }}>
          {hero.sectionLabel}
        </div>
        <div className="hidden sm:block font-mono text-[10px] muted" style={{ color: "var(--muted)" }}>
          {hero.sectionHint}
        </div>
      </motion.div>

      <div className="mt-8 md:mt-10 grid grid-cols-4 gap-4 md:gap-6">
        {/* Nombre — ocupa columnas 1–4 */}
        <h1 className="col-span-4 font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-[clamp(3.4rem,11vw,11rem)]">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="block"
            style={{ color: "var(--ink)" }}
          >
            <ScrambleText text={hero.firstName} playOnMount perChar={32} />
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.2, 0.7, 0.2, 1] }}
            className="block"
            style={{ color: "var(--wine)" }}
          >
            <ScrambleText text={hero.lastName} playOnMount perChar={32} />
          </motion.span>
        </h1>

        {/* Intro — 2 columnas */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="col-span-4 md:col-span-2 md:col-start-1 mt-10 md:mt-16 text-[15px] md:text-[17px] leading-[1.55] max-w-[40ch]"
          style={{ color: "var(--ink)" }}
        >
          {hero.intro}
        </motion.p>

        {/* Stack — columna 4 */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="col-span-4 md:col-span-1 md:col-start-4 mt-2 md:mt-16 flex flex-col gap-2"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
            STACK
          </div>
          <ul className="font-mono text-[12px] space-y-1.5" style={{ color: "var(--ink)" }}>
            {hero.stack.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="text-[var(--wine)]">/</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
