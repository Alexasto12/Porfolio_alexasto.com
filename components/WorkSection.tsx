"use client";

import { motion, useReducedMotion } from "motion/react";
import { ProjectRow } from "./ProjectRow";

type Item = {
  id: string;
  name: string;
  description: string;
  tags: readonly string[];
  link?: { label: string; href: string };
};

type Props = {
  id: string;
  label: string;
  items: readonly Item[];
};

export function WorkSection({ id, label, items }: Props) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className="shell pt-20 md:pt-28 pb-6">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-mono text-[11px] uppercase tracking-[0.22em] mb-8 md:mb-12"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </motion.div>

      <div className="border-b" style={{ borderColor: "var(--line-strong)" }}>
        {items.map((item, i) => (
          <ProjectRow
            key={item.id}
            index={String(i + 1).padStart(2, "0")}
            title={item.name}
            description={item.description}
            tags={item.tags}
            link={item.link}
            delay={i * 0.06}
          />
        ))}
      </div>
    </section>
  );
}
