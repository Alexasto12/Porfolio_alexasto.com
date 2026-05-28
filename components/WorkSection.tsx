"use client";

import { motion, useReducedMotion } from "motion/react";
import { ProjectRow } from "./ProjectRow";
import { useI18n, type Localized } from "@/lib/i18n";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  id: string;
  label: Localized<string>;
  intro?: Localized<string>;
  items: readonly LocalizedProject[];
};

export function WorkSection({ id, label, intro, items }: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section id={id} className="shell pt-24 md:pt-32 pb-8">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="grid grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-14"
      >
        <div
          className="col-span-4 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--muted)" }}
        >
          {t(label)}
        </div>
        {intro ? (
          <p
            key={`work-intro-${id}-${locale}`}
            className="col-span-4 md:col-span-3 text-[14px] md:text-[15px] leading-[1.6] max-w-[58ch]"
            style={{ color: "var(--muted)" }}
          >
            {t(intro)}
          </p>
        ) : null}
      </motion.div>

      <div className="border-b" style={{ borderColor: "var(--line-strong)" }}>
        {items.map((item, i) => (
          <ProjectRow
            key={item.id}
            index={String(i + 1).padStart(2, "0")}
            title={item.name}
            description={item.description}
            meta={item.meta}
            tags={item.tags}
            links={item.links}
            delay={i * 0.06}
          />
        ))}
      </div>
    </section>
  );
}
