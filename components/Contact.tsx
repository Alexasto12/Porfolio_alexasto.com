"use client";

import { motion, useReducedMotion } from "motion/react";
import { contact, telemetry } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

export function Contact() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section id="contacto" className="shell pt-28 md:pt-40 pb-24 md:pb-32">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex items-baseline justify-between gap-4 flex-wrap mb-10"
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--muted)" }}
        >
          {t(contact.sectionLabel)}
        </span>
        <span
          key={`avail-${locale}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: "var(--muted)" }}
        >
          <span
            className="dot-pulse inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--wine)" }}
          />
          {t(telemetry.availability)}
        </span>
      </motion.div>

      <motion.h2
        key={`c-h-${locale}`}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-[clamp(2.6rem,8vw,6rem)]"
      >
        <span className="block">{t(contact.heading)}</span>
        <span className="block" style={{ color: "var(--wine)" }}>
          {t(contact.headingAccent)}
        </span>
      </motion.h2>

      <motion.p
        key={`c-b-${locale}`}
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduced ? 0 : 0.7,
          delay: reduced ? 0 : 0.12,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        className="mt-8 max-w-[52ch] text-[15px] md:text-[17px] leading-[1.6]"
        style={{ color: "var(--muted)" }}
      >
        {t(contact.body)}
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduced ? 0 : 0.7,
          delay: reduced ? 0 : 0.22,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        className="mt-14 md:mt-20 grid grid-cols-4 gap-4 md:gap-6 items-end"
      >
        <a
          href={contact.cta.href}
          className="col-span-4 md:col-span-2 inline-flex items-center justify-between gap-6 p-6 md:p-8 rounded-[6px] transition-colors duration-300 group"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold tracking-[-0.01em]">
              {t(contact.cta.label)}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70 truncate">
              {contact.email}
            </span>
          </div>
          <span
            className="font-display text-[clamp(1.6rem,3vw,2rem)] transition-transform duration-500 group-hover:translate-x-2 shrink-0"
            aria-hidden="true"
          >
            →
          </span>
        </a>

        <ul className="col-span-4 md:col-span-2 md:col-start-3 flex flex-col gap-3">
          {contact.links.map((l) => (
            <li
              key={l.label}
              className="border-b pb-3"
              style={{ borderColor: "var(--line-strong)" }}
            >
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
        style={{
          borderTop: "1px solid var(--line)",
          color: "var(--muted)",
        }}
      >
        <span className="col-span-4 md:col-span-2">AC_SYSTEMS · BCN</span>
        <span
          key={`c-fn-${locale}`}
          className="col-span-4 md:col-span-2 md:text-right"
        >
          {t(contact.footerNote)}
        </span>
        <span className="col-span-4 md:col-span-2 mt-2 md:mt-0">
          © {new Date().getFullYear()} · alexasto.com
        </span>
        <span className="col-span-4 md:col-span-2 md:text-right">
          Next.js 15 · Motion · Tailwind v4
        </span>
      </motion.div>
    </section>
  );
}
