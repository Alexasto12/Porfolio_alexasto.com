"use client";

import { motion, useReducedMotion } from "motion/react";
import { contact, telemetry } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { MagneticLink } from "./MagneticLink";
import { ParallaxNumber } from "./ParallaxNumber";

export function Contact() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section
      id="contacto"
      className="dark-block relative w-full"
      style={{ background: "#111111" }}
    >
      <div className="shell pt-28 md:pt-40 pb-24 md:pb-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-baseline justify-between gap-4 flex-wrap mb-12 pb-6"
          style={{ borderBottom: "1px solid var(--line-dark)" }}
        >
          <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
            <ParallaxNumber
              aria-hidden="true"
              className="font-display font-extrabold leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,11vw,9.5rem)] section-number"
              style={{ color: "var(--paper-on-dark)" }}
            >
              {contact.sectionNumber}
            </ParallaxNumber>
            <span
              className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em]"
              style={{ color: "var(--muted-dark)" }}
            >
              {t(contact.sectionLabel)}
            </span>
          </div>
          <span
            key={`avail-${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "var(--muted-dark)" }}
          >
            <span
              className="dot-pulse inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--wine-bright)" }}
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
          className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-[clamp(2.8rem,9vw,6.8rem)] hero-shadow"
        >
          <span className="block" style={{ color: "var(--paper-on-dark)" }}>
            {t(contact.heading)}
          </span>
          <span className="block" style={{ color: "var(--wine-bright)" }}>
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
          className="mt-10 max-w-[58ch] text-[16px] md:text-[18px] leading-[1.6] font-medium"
          style={{ color: "var(--muted-dark)" }}
        >
          {t(contact.body)}
        </motion.p>

        {/* ── Formulario oscuro ── */}
        <motion.form
          action={`mailto:${contact.email}`}
          method="post"
          encType="text/plain"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.2,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-14 md:mt-20 flex flex-col gap-4 max-w-[56ch]"
        >
          <input
            name="name"
            type="text"
            placeholder={locale === "en" ? "Name" : locale === "ca" ? "Nom" : "Nombre"}
            className="contact-input font-mono text-[13px] px-4 py-3 w-full"
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="contact-input font-mono text-[13px] px-4 py-3 w-full"
            autoComplete="email"
          />
          <textarea
            name="message"
            rows={5}
            placeholder={locale === "en" ? "Message" : locale === "ca" ? "Missatge" : "Mensaje"}
            className="contact-input font-mono text-[13px] px-4 py-3 w-full resize-none"
          />
          <div className="flex items-center justify-between gap-4 pt-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--muted-dark)" }}
            >
              {contact.email}
            </span>
            <button
              type="submit"
              className="contact-submit inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] font-bold px-6 py-3"
              style={{ color: "var(--paper-on-dark)" }}
            >
              {locale === "en" ? "SEND" : locale === "ca" ? "ENVIAR" : "ENVIAR"}
              <span
                className="contact-submit-icon text-[1.1rem] leading-none transition-transform duration-400"
                style={{ color: "var(--wine-bright)" }}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </motion.form>

        {/* ── Links secundarios ── */}
        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.32,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-14 md:mt-16 flex flex-col gap-3 max-w-[56ch]"
        >
          {contact.links.map((l) => (
            <li
              key={l.label}
              className="border-b pb-3"
              style={{ borderColor: "var(--line-dark)" }}
            >
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.18em] link-underline"
                style={{ color: "var(--paper-on-dark)" }}
              >
                <span>{l.label}</span>
                <span style={{ color: "var(--wine-bright)" }}>↗</span>
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
          className="mt-20 md:mt-24 pt-6 grid grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{
            borderTop: "1px solid var(--line-dark)",
            color: "var(--muted-dark)",
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
      </div>
    </section>
  );
}
