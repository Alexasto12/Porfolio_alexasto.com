"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShotPlaceholder } from "./ShotPlaceholder";
import { ScrambleText } from "./ScrambleText";
import { useI18n } from "@/lib/i18n";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  project: LocalizedProject;
  index: number;
  /** Reverse the columns for visual rhythm on alternating rows. */
  reverse?: boolean;
};

export function ProjectCard({ project, index, reverse }: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();
  const i = String(index + 1).padStart(2, "0");

  const shotLabel = project.shotLabel ? t(project.shotLabel) : project.name;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : index * 0.05,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start py-14 md:py-20 border-t"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`}>
        <ShotPlaceholder
          label={project.name}
          hint={shotLabel}
          ratio="16 / 10"
        />
      </div>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:order-2"} flex flex-col`}>
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
            style={{ color: "var(--wine)" }}
          >
            {i}
          </span>
          <span
            className="h-px flex-1"
            style={{ background: "var(--line-strong)" }}
          />
        </div>
        <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
          <ScrambleText text={project.name} perChar={22} replayKey={locale} />
        </h3>
        {project.meta ? (
          <div
            key={`m-${project.id}-${locale}`}
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--wine)" }}
          >
            {t(project.meta)}
          </div>
        ) : null}
        <p
          key={`d-${project.id}-${locale}`}
          className="mt-5 text-[15px] md:text-[16.5px] leading-[1.65] font-medium"
          style={{ color: "var(--ink)" }}
        >
          {t(project.description)}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tg, j) => (
            <span
              key={`${j}-${locale}`}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-[4px]"
              style={{
                border: "1px solid var(--line-strong)",
                color: "var(--ink)",
              }}
            >
              {t(tg)}
            </span>
          ))}
        </div>

        {project.links.length > 0 ? (
          <ul className="mt-7 flex flex-col gap-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-row inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: "var(--ink)" }}
                >
                  <span
                    className="link-row__bar inline-block h-[2px] w-10 transition-all duration-500"
                    style={{ background: "var(--wine)" }}
                  />
                  <span className="link-row__text">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
