"use client";

import { motion, useReducedMotion } from "motion/react";
import { services } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { staggerParent, fadeRight, fadeUp, VIEWPORT, EASE_OUT } from "@/lib/motion";

/** Content-only — chrome supplied by <CollapsibleSection>. */
export function ServicesContent() {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
        {services.groups.map((group, i) => (
          <motion.div
            key={`g-${i}`}
            className="pt-6"
            style={{ borderTop: "2px solid var(--ink)" }}
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3
                key={`g-t-${i}-${locale}`}
                className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] font-semibold leading-[1.12] tracking-[-0.015em]"
              >
                {t(group.group)}
              </h3>
              <span
                className="font-mono text-[11px] tabular shrink-0"
                style={{ color: "var(--wine)" }}
              >
                {String(i + 1).padStart(2, "0")} / {String(services.groups.length).padStart(2, "0")}
              </span>
            </div>
            <motion.ul
              className="mt-6 space-y-3.5"
              variants={staggerParent(0.05)}
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {group.items.map((item, j) => (
                <motion.li
                  key={`it-${i}-${j}-${locale}`}
                  variants={fadeRight}
                  className="flex items-baseline gap-3 pb-3.5"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <span
                    className="font-mono text-[11px] tabular shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14.5px] md:text-[15.5px] leading-[1.5] font-medium">
                    {t(item)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-14 md:mt-20"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <a
          href={services.cta.href}
          className="inline-flex items-center gap-4 font-display text-[clamp(1.2rem,2.4vw,1.8rem)] font-semibold tracking-[-0.01em] link-cta-big"
          style={{ color: "var(--ink)" }}
        >
          <span
            className="inline-block h-[2px] w-12 transition-all duration-500"
            style={{ background: "var(--wine)" }}
          />
          <span>{t(services.cta.label)}</span>
        </a>
      </motion.div>
    </>
  );
}
