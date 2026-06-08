"use client";

import { motion, useReducedMotion } from "motion/react";
import { contact, telemetry } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import { MagneticLink } from "./MagneticLink";
import { ParallaxNumber } from "./ParallaxNumber";
import { RevealText } from "./Reveal";
import { EASE_OUT } from "@/lib/motion";

export function Contact() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <Section id="contacto">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
        className="flex items-baseline justify-between gap-4 flex-wrap mb-12 pb-6"
        style={{ borderBottom: "1px solid var(--line-strong)" }}
      >
        <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
          <ParallaxNumber
            aria-hidden="true"
            className="font-display font-extrabold leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,11vw,9.5rem)] section-number"
            style={{ color: "var(--ink)" }}
          >
            {contact.sectionNumber}
          </ParallaxNumber>
          <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
            {t(contact.sectionLabel)}
          </span>
        </div>
        <span
          key={`avail-${locale}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: "var(--muted)" }}
        >
          <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--wine)" }} />
          {t(telemetry.availability)}
        </span>
      </motion.div>

      <h2 className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-[clamp(2.8rem,9vw,6.8rem)] hero-shadow">
        <span className="block">
          <RevealText key={`c-h-${locale}`} text={t(contact.heading)} />
        </span>
        <span className="block" style={{ color: "var(--wine)" }}>
          <RevealText key={`c-ha-${locale}`} text={t(contact.headingAccent)} delay={0.15} />
        </span>
      </h2>

      <motion.p
        key={`c-b-${locale}`}
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.12, ease: EASE_OUT }}
        className="mt-10 max-w-[58ch] text-[16px] md:text-[18px] leading-[1.6] font-medium"
        style={{ color: "var(--ink)" }}
      >
        {t(contact.body)}
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.22, ease: EASE_OUT }}
        className="mt-14 md:mt-20 grid grid-cols-4 gap-4 md:gap-6 items-end"
      >
        <MagneticLink
          href={contact.cta.href}
          className="col-span-4 md:col-span-2 inline-flex items-center justify-between gap-6 p-7 md:p-9 rounded-[8px] transition-colors duration-300 group shadow-card cta-magnetic"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          <div className="flex flex-col gap-2 min-w-0">
            <span className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.015em]">
              {t(contact.cta.label)}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75 truncate">
              {contact.email}
            </span>
          </div>
          <span
            className="font-display text-[clamp(1.6rem,3vw,2.2rem)] transition-transform duration-500 group-hover:translate-x-2 shrink-0"
            aria-hidden="true"
          >
            →
          </span>
        </MagneticLink>

        <ul className="col-span-4 md:col-span-2 md:col-start-3 flex flex-col gap-3">
          {contact.links.map((l) => (
            <li key={l.label} className="border-b pb-3" style={{ borderColor: "var(--line-strong)" }}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.18em] link-underline"
              >
                <span>{l.label}</span>
                <span style={{ color: "var(--wine)" }}>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
        className="mt-20 md:mt-24 pt-6 grid grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
      >
        <span className="col-span-4 md:col-span-2">AC_SYSTEMS · BCN</span>
        <span key={`c-fn-${locale}`} className="col-span-4 md:col-span-2 md:text-right">
          {t(contact.footerNote)}
        </span>
        <span className="col-span-4 md:col-span-2 mt-2 md:mt-0">
          © {new Date().getFullYear()} · alexasto.com
        </span>
        <span className="col-span-4 md:col-span-2 md:text-right">
          Next.js 15 · Motion · anime.js · Tailwind v4
        </span>
      </motion.div>
    </Section>
  );
}
