"use client";

import { motion, useReducedMotion } from "motion/react";
import { contact } from "@/data/projects";

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section id="contacto" className="shell pt-24 md:pt-36 pb-20 md:pb-28">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-mono text-[11px] uppercase tracking-[0.22em] mb-8"
        style={{ color: "var(--muted)" }}
      >
        004 — CONTACTO
      </motion.div>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] text-[clamp(2.4rem,7.5vw,5.6rem)]"
      >
        <span className="block">{contact.heading}</span>
        <span className="block" style={{ color: "var(--wine)" }}>
          {contact.headingAccent}
        </span>
      </motion.h2>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-12 md:mt-16 grid grid-cols-4 gap-4 md:gap-6 items-end"
      >
        <a
          href={contact.cta.href}
          className="col-span-4 md:col-span-2 inline-flex items-center justify-between gap-6 p-6 md:p-8 rounded-[6px] transition-colors duration-300 group"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          <span className="font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold tracking-[-0.01em]">
            {contact.cta.label}
          </span>
          <span
            className="font-display text-[clamp(1.6rem,3vw,2rem)] transition-transform duration-500 group-hover:translate-x-2"
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
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 pt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{
          borderTop: "1px solid var(--line)",
          color: "var(--muted)",
        }}
      >
        <span>AC_SYSTEMS · BCN</span>
        <span>© {new Date().getFullYear()} · alexasto.com</span>
      </motion.div>
    </section>
  );
}
