"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { Section } from "./Section";
import { Counter } from "./Counter";
import { Sparkline } from "./Sparkline";
import { ApiSnippet } from "./ApiSnippet";
import { RevealText } from "./Reveal";
import { neibr } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { staggerParent, fadeRight, fadeUp, blurUp, scaleIn, EASE_OUT, VIEWPORT } from "@/lib/motion";

export function NeibrFeature() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  // Kinetic wordmark: weight tracks scroll position through the heading.
  const wordRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end start"],
  });
  const wght = useTransform(scrollYProgress, [0, 0.5, 1], [440, 800, 560]);
  const fvs = useMotionTemplate`"wght" ${wght}, "opsz" 40`;

  return (
    <Section id="neibr">
      <div className="border-t pt-14 md:pt-20" style={{ borderColor: "var(--line-strong)" }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
          className="flex items-baseline gap-4 flex-wrap"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
            ★ {t(neibr.sectionLabel)}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-[4px]"
            style={{ border: "1px solid var(--wine)", color: "var(--wine)", fontWeight: 700 }}
          >
            {t(neibr.productLabel)}
          </span>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-4 gap-4 md:gap-8 items-end">
          <motion.h2
            ref={wordRef}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
            className="col-span-4 md:col-span-3 font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-[clamp(3.6rem,11vw,9.5rem)] hero-shadow"
            style={reduced ? undefined : { fontVariationSettings: fvs }}
          >
            {neibr.title}
            <span style={{ color: "var(--wine)" }}>.</span>
          </motion.h2>
          <motion.p
            key={`neibr-tag-${locale}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.12, ease: EASE_OUT }}
            className="col-span-4 md:col-span-1 font-display text-[clamp(1.1rem,2vw,1.5rem)] font-medium md:text-right"
            style={{ color: "var(--wine)" }}
          >
            {t(neibr.tagline)}
          </motion.p>
        </div>

        {/* API snippet — compact, real endpoint */}
        <div className="mt-14 md:mt-20 grid grid-cols-4 gap-4 md:gap-8">
          <div className="col-span-4 md:col-span-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
              ↳ {t(neibr.endpointLabel)}
            </div>
            <div
              key={`endpoint-${locale}`}
              className="mt-1 font-display text-[clamp(1rem,1.7vw,1.2rem)] font-semibold leading-[1.25] tracking-[-0.01em]"
            >
              {t(neibr.endpointTitle)}
            </div>
          </div>
          <div className="col-span-4 md:col-span-3">
            <ApiSnippet />
          </div>
        </div>

        {/* Description + stat */}
        <div className="mt-16 md:mt-24 grid grid-cols-4 gap-6 md:gap-10">
          <motion.div
            variants={staggerParent(0.1)}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            className="col-span-4 md:col-span-2"
          >
            <motion.p
              variants={fadeUp}
              key={`neibr-desc-${locale}`}
              className="text-[15px] md:text-[17px] leading-[1.65] font-medium max-w-[46ch]"
            >
              {t(neibr.description)}
            </motion.p>
            <motion.p
              variants={fadeUp}
              key={`neibr-desc2-${locale}`}
              className="mt-5 text-[14px] md:text-[15px] leading-[1.65] max-w-[46ch]"
              style={{ color: "var(--muted)" }}
            >
              {t(neibr.description2)}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted)" }}
            >
              ↳ {t(neibr.conceptsLabel)}
            </motion.div>
            <motion.ul
              variants={staggerParent(0.06)}
              className="mt-3 space-y-1.5 font-mono text-[12px]"
              style={{ color: "var(--ink)" }}
            >
              {neibr.concepts.map((c, i) => (
                <motion.li variants={fadeRight} key={`${i}-${locale}`} className="flex items-start gap-2">
                  <span style={{ color: "var(--wine)" }}>→</span>
                  <span>{t(c)}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-1.5">
              {neibr.tags.map((tg, i) => (
                <span
                  key={`${i}-${locale}`}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-[4px]"
                  style={{ border: "1px solid var(--line-strong)", color: "var(--ink)" }}
                >
                  {t(tg)}
                </span>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              key={`neibr-sep-${locale}`}
              className="mt-8 text-[13px] leading-[1.6] italic"
              style={{ color: "var(--muted)" }}
            >
              ↘ {t(neibr.separateLandingNote)}
            </motion.p>
          </motion.div>

          {/* Star stat */}
          <motion.div
            variants={scaleIn}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="col-span-4 md:col-span-2 md:col-start-3"
          >
            <div
              className="p-6 md:p-8 rounded-[8px] flex flex-col h-full shadow-card scanlines relative overflow-hidden"
              style={{
                background: "color-mix(in srgb, var(--ink) 4%, transparent)",
                border: "1px solid var(--line-strong)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
                  {t(neibr.outputLabel)}
                </div>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5 font-bold"
                  style={{ color: "var(--wine)" }}
                >
                  <span className="dot-pulse h-1.5 w-1.5 rounded-full" style={{ background: "var(--wine)" }} />
                  PASSED
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-display font-extrabold leading-[0.86] tracking-[-0.045em] text-[clamp(3rem,9vw,6.6rem)] hero-shadow"
                  style={{ color: "var(--wine)" }}
                >
                  <Counter to={neibr.stat.value} duration={1800} />
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  {t(neibr.stat.valueLabel)}
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold">
                  {neibr.stat.duration}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  {t(neibr.stat.durationLabel)}
                </span>
              </div>

              <p
                key={`stat-caption-${locale}`}
                className="mt-5 text-[13px] leading-[1.65]"
                style={{ color: "var(--muted)" }}
              >
                {t(neibr.stat.caption)}
              </p>

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                <Sparkline />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
