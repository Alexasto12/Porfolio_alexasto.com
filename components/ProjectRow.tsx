"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "./ScrambleText";
import { useI18n, type Localized } from "@/lib/i18n";

type Link = { label: string; href: string; kind?: string };

type Props = {
  index: string;
  title: string;
  description: Localized<string>;
  meta?: Localized<string>;
  tags: readonly Localized<string>[];
  links?: readonly Link[];
  dark?: boolean;
  delay?: number;
};

export function ProjectRow({
  index,
  title,
  description,
  meta,
  tags,
  links,
  dark,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="project-row grid grid-cols-4 gap-4 md:gap-6 items-start py-8 md:py-10 border-t"
      style={{
        borderColor: dark ? "var(--line-dark)" : "var(--line-strong)",
      }}
    >
      <div className="col-span-4 md:col-span-1 flex items-start gap-3">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em] mt-1 tabular"
          style={{ color: dark ? "var(--muted-dark)" : "var(--muted)" }}
        >
          {index}
        </span>
      </div>

      <div className="col-span-4 md:col-span-2">
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] flex items-baseline gap-3 flex-wrap">
          <ScrambleText text={title} perChar={22} replayKey={locale} />
        </h3>
        {meta ? (
          <div
            key={`meta-${locale}`}
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "var(--wine)" }}
          >
            {t(meta)}
          </div>
        ) : null}
        <p
          key={`desc-${locale}`}
          className="mt-3 text-[14px] md:text-[15px] leading-[1.6] max-w-[52ch]"
          style={{ color: dark ? "var(--paper-on-dark)" : "var(--ink)" }}
        >
          {t(description)}
        </p>
      </div>

      <div className="col-span-4 md:col-span-1 flex flex-col gap-3 md:items-end">
        <div className="flex flex-wrap md:justify-end gap-1.5">
          {tags.map((tg, i) => (
            <span
              key={`${i}-${locale}`}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-[4px]"
              style={{
                border: `1px solid ${
                  dark ? "var(--line-dark)" : "var(--line-strong)"
                }`,
                color: dark ? "var(--paper-on-dark)" : "var(--ink)",
              }}
            >
              {t(tg)}
            </span>
          ))}
        </div>
        {links && links.length > 0 ? (
          <ul className="flex flex-col md:items-end gap-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] uppercase tracking-[0.16em] link-underline"
                  style={{ color: "var(--wine)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.div>
  );
}
