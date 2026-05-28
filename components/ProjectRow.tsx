"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "./ScrambleText";

type Props = {
  index: string;
  title: string;
  description: string;
  tags: readonly string[];
  link?: { label: string; href: string };
  dark?: boolean;
  delay?: number;
};

export function ProjectRow({
  index,
  title,
  description,
  tags,
  link,
  dark,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();

  const rowContent = (
    <>
      <div className="col-span-4 md:col-span-1 flex items-start gap-3">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.16em] mt-1"
          style={{ color: dark ? "var(--muted-dark)" : "var(--muted)" }}
        >
          {index}
        </span>
      </div>

      <div className="col-span-4 md:col-span-2">
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] flex items-baseline gap-3 flex-wrap">
          <ScrambleText text={title} perChar={22} />
          <span
            className="arrow font-display text-[clamp(1.4rem,2.4vw,2rem)]"
            style={{ color: "var(--wine)" }}
            aria-hidden="true"
          >
            →
          </span>
        </h3>
        <p
          className="mt-3 text-[14px] md:text-[15px] leading-[1.55] max-w-[48ch]"
          style={{ color: dark ? "var(--paper-on-dark)" : "var(--ink)" }}
        >
          {description}
        </p>
      </div>

      <div className="col-span-4 md:col-span-1 flex flex-col gap-2 md:items-end">
        <div className="flex flex-wrap md:justify-end gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-[4px]"
              style={{
                border: `1px solid ${
                  dark ? "var(--line-dark)" : "var(--line-strong)"
                }`,
                color: dark ? "var(--paper-on-dark)" : "var(--ink)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {link ? (
          <span
            className="font-mono text-[11px] uppercase tracking-[0.16em] mt-1"
            style={{ color: "var(--wine)" }}
          >
            {link.label}
          </span>
        ) : null}
      </div>
    </>
  );

  const baseClasses =
    "project-row grid grid-cols-4 gap-4 md:gap-6 items-start py-7 md:py-9 border-t";

  if (link) {
    return (
      <motion.a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
        className={`${baseClasses} block group cursor-pointer`}
        style={{
          borderColor: dark ? "var(--line-dark)" : "var(--line-strong)",
        }}
      >
        {rowContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={baseClasses}
      style={{
        borderColor: dark ? "var(--line-dark)" : "var(--line-strong)",
      }}
    >
      {rowContent}
    </motion.div>
  );
}
