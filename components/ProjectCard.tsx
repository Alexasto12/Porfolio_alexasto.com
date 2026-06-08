"use client";

import { motion, useReducedMotion } from "motion/react";
import { BrowserFrame } from "./BrowserFrame";
import { ScrambleText } from "./ScrambleText";
import { useI18n } from "@/lib/i18n";
import { staggerParent, fadeUp, fadeRight, VIEWPORT } from "@/lib/motion";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  project: LocalizedProject;
  index: number;
  first?: boolean;
  /** Reverse the columns for visual rhythm on alternating rows. */
  reverse?: boolean;
};

function hostnameOf(project: LocalizedProject): string | undefined {
  if (project.domain) return project.domain;
  const href = project.links[0]?.href;
  if (!href || !href.startsWith("http")) return undefined;
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function ProjectCard({ project, index, first, reverse }: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();
  const i = String(index + 1).padStart(2, "0");
  const shotLabel = project.shotLabel ? t(project.shotLabel) : project.name;

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-10 items-center py-12 md:py-16"
      style={
        first
          ? undefined
          : { borderTop: "1px solid var(--line-strong)", marginTop: "0.5rem" }
      }
    >
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`}>
        <BrowserFrame
          src={project.image}
          domain={hostnameOf(project)}
          label={project.name}
          hint={shotLabel}
          alt={`${project.name} — ${t(project.description).slice(0, 80)}`}
          ratio="16 / 10"
        />
      </div>

      <motion.div
        className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:order-2"} flex flex-col`}
        variants={staggerParent(0.08)}
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={VIEWPORT}
      >
        <motion.div variants={fadeRight} className="flex items-baseline gap-3">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
            style={{ color: "var(--wine)" }}
          >
            {i}
          </span>
          <span className="h-px flex-1" style={{ background: "var(--line-strong)" }} />
        </motion.div>

        <motion.h3
          variants={fadeUp}
          className="mt-5 font-display text-[clamp(2rem,3.6vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
        >
          <ScrambleText text={project.name} perChar={22} replayKey={locale} />
        </motion.h3>

        {project.meta ? (
          <motion.div
            variants={fadeUp}
            key={`m-${project.id}-${locale}`}
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--wine)" }}
          >
            {t(project.meta)}
          </motion.div>
        ) : null}

        <motion.p
          variants={fadeUp}
          key={`d-${project.id}-${locale}`}
          className="mt-5 text-[15px] md:text-[16.5px] leading-[1.65] font-medium"
          style={{ color: "var(--ink)" }}
        >
          {t(project.description)}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tg, j) => (
            <span
              key={`${j}-${locale}`}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-[4px]"
              style={{ border: "1px solid var(--line-strong)", color: "var(--ink)" }}
            >
              {t(tg)}
            </span>
          ))}
        </motion.div>

        {project.links.length > 0 ? (
          <motion.ul variants={fadeUp} className="mt-7 flex flex-col gap-3">
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
          </motion.ul>
        ) : null}
      </motion.div>
    </article>
  );
}
