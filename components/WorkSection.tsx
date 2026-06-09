"use client";

import { ParallaxNumber } from "./ParallaxNumber";
import { ProjectCard } from "./ProjectCard";
import { useI18n, type Localized } from "@/lib/i18n";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  id: string;
  number: string;
  label: Localized<string>;
  heading?: Localized<string>;
  description?: Localized<string>;
  items: readonly LocalizedProject[];
};

export function WorkSection({ id, number, label, heading, description, items }: Props) {
  const { t, locale } = useI18n();

  return (
    <section id={id} className="shell">
      <details className="group">
        <summary className="list-none cursor-pointer outline-none pt-28 md:pt-40">
          {/* ── Fila número + toggle ── */}
          <div
            className="flex items-center justify-between gap-6 pb-6 md:pb-8"
            style={{ borderBottom: "1px solid var(--line-strong)" }}
          >
            <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
              <ParallaxNumber
                aria-hidden="true"
                className="font-display font-extrabold tabular leading-[0.82] tracking-[-0.04em] text-[clamp(4.5rem,11vw,9.5rem)] section-number"
                style={{ color: "var(--ink)", opacity: 0.96 }}
              >
                {number}
              </ParallaxNumber>
              <span
                key={`label-${number}-${locale}`}
                className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em]"
                style={{ color: "var(--muted)" }}
              >
                {t(label)}
              </span>
            </div>

            {/* Toggle: centrado en el eje Y del número masivo */}
            <span
              aria-hidden="true"
              className="accordion-toggle shrink-0 font-mono font-bold text-[1.75rem] leading-none select-none"
              style={{ color: "var(--wine)" }}
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </div>

          {/* Título + descripción: siempre visibles */}
          {(heading || description) && (
            <div className="mt-8 md:mt-12 grid grid-cols-4 gap-4 md:gap-8">
              {heading && (
                <h2
                  key={`h-${number}-${locale}`}
                  className="col-span-4 md:col-span-3 font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,5.2vw,4.2rem)] max-w-[22ch]"
                  style={{ color: "var(--ink)" }}
                >
                  {t(heading)}
                </h2>
              )}
              {description && (
                <p
                  key={`d-${number}-${locale}`}
                  className="col-span-4 md:col-span-3 mt-2 md:mt-4 text-[15px] md:text-[17px] leading-[1.6] max-w-[62ch]"
                  style={{ color: "var(--ink)" }}
                >
                  {t(description)}
                </p>
              )}
            </div>
          )}
        </summary>

        {/* ── Cuerpo colapsable: los proyectos ── */}
        <div className="mt-14 md:mt-20 pb-24 md:pb-32">
          {items.map((item, i) => (
            <ProjectCard
              key={item.id}
              project={item}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </details>
    </section>
  );
}
