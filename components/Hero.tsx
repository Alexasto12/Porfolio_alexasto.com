"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Section } from "./Section";
import { ScrambleText } from "./ScrambleText";
import { RevealText } from "./Reveal";
import { useDrawOnView } from "@/lib/anime";
import { staggerParent, fadeRight, fadeUp, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { hero } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  useDrawOnView(markRef, inView, { duration: 1200, delay: 700, ease: "inOutQuad" });

  return (
    <Section id="perfil" first>
      <div ref={sectionRef}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
          className="flex items-baseline justify-between gap-4"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
            {t(hero.sectionLabel)}
          </div>
          <div className="hidden sm:block font-mono text-[10px]" style={{ color: "var(--muted)" }}>
            {t(hero.sectionHint)}
          </div>
        </motion.div>

        {/* Name */}
        <h1 className="mt-10 md:mt-14 font-display font-extrabold leading-[0.86] tracking-[-0.045em] text-[clamp(3.8rem,13vw,13rem)] hero-shadow">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
            className="block"
            style={{ color: "var(--ink)" }}
          >
            <ScrambleText text={hero.firstName} playOnMount perChar={32} />
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.26, ease: EASE_OUT }}
            className="block w-fit"
            style={{ color: "var(--wine)" }}
          >
            <ScrambleText text={hero.lastName} playOnMount perChar={32} />
          </motion.span>
        </h1>

        {/* anime.js-drawn signature stroke under the surname */}
        <svg
          ref={markRef}
          aria-hidden="true"
          viewBox="0 0 320 26"
          fill="none"
          className="mt-3 h-5 w-[clamp(180px,32vw,360px)]"
          preserveAspectRatio="xMinYMid meet"
        >
          <path
            d="M3 18 C 64 6, 120 24, 176 12 S 268 6, 317 16"
            stroke="var(--wine)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Tagline */}
        <p
          key={`tagline-${locale}`}
          className="mt-9 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold tracking-[-0.02em]"
          style={{ color: "var(--ink)" }}
        >
          <RevealText text={t(hero.tagline)} perWord={0.05} delay={0.4} />
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-4 gap-6 md:gap-10">
          {/* Intro */}
          <motion.div
            variants={staggerParent(0.12)}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            className="col-span-4 md:col-span-2 max-w-[48ch]"
          >
            <motion.div
              variants={fadeUp}
              className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4"
              style={{ color: "var(--muted)" }}
            >
              ↓ {t(hero.contextLabel)}
            </motion.div>
            <motion.p
              variants={fadeUp}
              key={`intro-${locale}`}
              className="text-[16px] md:text-[18px] leading-[1.6] font-medium"
              style={{ color: "var(--ink)" }}
            >
              {t(hero.intro)}
            </motion.p>
            <motion.p
              variants={fadeUp}
              key={`intro2-${locale}`}
              className="mt-5 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "var(--muted)" }}
            >
              {t(hero.intro2)}
            </motion.p>
          </motion.div>

          {/* Stack + ratings */}
          <motion.div
            variants={staggerParent(0.08, 0.15)}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            className="col-span-4 md:col-span-2 md:col-start-3 flex flex-col gap-8"
          >
            <div>
              <motion.div
                variants={fadeRight}
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                style={{ color: "var(--muted)" }}
              >
                ↳ {t(hero.stackLabel)}
              </motion.div>
              <ul className="font-mono text-[13px] space-y-2" style={{ color: "var(--ink)" }}>
                {hero.stack.map((s) => (
                  <motion.li variants={fadeRight} key={s.label} className="flex items-center gap-3">
                    <span style={{ color: "var(--wine)" }}>/</span>
                    <span style={{ color: s.weight === "secondary" ? "var(--muted)" : "var(--ink)" }}>
                      {s.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-5" style={{ borderColor: "var(--line-strong)" }}>
              <motion.div
                variants={fadeRight}
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                style={{ color: "var(--muted)" }}
              >
                ↳ SELF · X/10
              </motion.div>
              <ul className="space-y-2.5">
                {hero.ratings.map((r) => (
                  <motion.li variants={fadeRight} key={r.label.es} className="flex items-center gap-3">
                    <div className="flex gap-[2px]">
                      {Array.from({ length: 10 }).map((_, k) => {
                        const filled = k < r.value;
                        return (
                          <motion.span
                            key={k}
                            className="h-3 w-[3px] origin-bottom"
                            style={{
                              background: filled
                                ? "var(--wine)"
                                : "color-mix(in srgb, var(--ink) 12%, transparent)",
                            }}
                            initial={reduced || !filled ? false : { scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.4, delay: 0.04 * k, ease: EASE_OUT }}
                          />
                        );
                      })}
                    </div>
                    <span
                      key={`${r.label.es}-${locale}`}
                      className="font-mono text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: "var(--ink)" }}
                    >
                      {t(r.label)}
                    </span>
                    <span className="font-mono text-[11px] tabular ml-auto" style={{ color: "var(--wine)" }}>
                      {r.value}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
