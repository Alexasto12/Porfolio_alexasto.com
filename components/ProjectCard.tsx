"use client";

import { motion, useReducedMotion } from "motion/react";
import { Browser } from "./Browser";
import { MockSite } from "./mocks/MockSite";
import { ScrambleText } from "./ScrambleText";
import { useI18n } from "@/lib/i18n";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  project: LocalizedProject;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();
  const i = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : index * 0.06,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start py-12 md:py-16 border-t"
      style={{ borderColor: "var(--line-strong)" }}
    >
      {/* Mockup */}
      <div className="lg:col-span-7 order-1">
        {project.mock ? (
          <div className="relative card-tilt">
            <Browser
              url={project.mockUrl ?? project.name}
              badge={i}
              variant={
                project.mock === "neibrPlatform" || project.mock === "peer2stream"
                  ? "dark"
                  : "light"
              }
              ratio="16/10"
            >
              <MockSite kind={project.mock} />
            </Browser>
          </div>
        ) : (
          <div
            className="rounded-[8px] aspect-[16/10] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--ink) 4%, transparent), color-mix(in srgb, var(--wine) 6%, transparent))",
              border: "1px solid var(--line-strong)",
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted)" }}
            >
              {project.name}
            </span>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="lg:col-span-5 order-2 flex flex-col">
        <div
          className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
          style={{ color: "var(--wine)" }}
        >
          {i}
        </div>
        <h3 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
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
          className="mt-5 text-[15px] md:text-[16px] leading-[1.6]"
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
          <ul className="mt-6 flex flex-col gap-2">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-cta inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--wine)" }}
                >
                  <span
                    className="inline-block h-px w-8 transition-all duration-500 group-hover:w-12"
                    style={{ background: "var(--wine)" }}
                  />
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
