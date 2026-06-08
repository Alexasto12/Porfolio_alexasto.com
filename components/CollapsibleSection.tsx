"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n, l, type Localized } from "@/lib/i18n";
import { ParallaxNumber } from "./ParallaxNumber";
import { RevealText } from "./Reveal";
import { EASE_OUT, EASE_IN_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  number: string;
  label: Localized<string>;
  title?: Localized<string>;
  /** One-line gist shown whether open or closed — the "resumen". */
  summary?: Localized<string>;
  meta?: Localized<string>;
  dark?: boolean;
  /** Allow the section to collapse. When false it stays open with no toggle. */
  collapsible?: boolean;
  /** Initial open state for collapsible sections. */
  defaultOpen?: boolean;
  bleed?: boolean;
  aside?: React.ReactNode;
  children: React.ReactNode;
};

const TOGGLE = {
  open: l("Desplegar", "Expand", "Desplegar"),
  close: l("Plegar", "Collapse", "Plegar"),
};

export function CollapsibleSection({
  id,
  number,
  label,
  title,
  summary,
  meta,
  dark,
  collapsible = true,
  defaultOpen = false,
  bleed,
  aside,
  children,
}: Props) {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();
  const contentId = useId();
  const [open, setOpen] = useState(collapsible ? defaultOpen : true);

  const muted = dark ? "var(--muted-dark)" : "var(--muted)";
  const lineCol = dark ? "var(--line-dark)" : "var(--line-strong)";
  const ink = dark ? "var(--paper-on-dark)" : "var(--ink)";

  const Inner = (
    <>
      <header className="relative">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
            <ParallaxNumber
              aria-hidden="true"
              className="font-display font-extrabold tabular leading-[0.82] tracking-[-0.04em] text-[clamp(3.4rem,9vw,8rem)] section-number"
              style={{ color: ink, opacity: dark ? 0.92 : 0.96 }}
            >
              {number}
            </ParallaxNumber>
            <span
              key={`label-${number}-${locale}`}
              className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em] pt-2"
              style={{ color: muted }}
            >
              {t(label)}
            </span>
          </div>

          {collapsible ? (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={contentId}
              className="group/toggle shrink-0 inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] pt-3 outline-none"
              style={{ color: dark ? "var(--paper-on-dark)" : "var(--ink)" }}
            >
              <span className="hidden sm:inline transition-opacity duration-300 group-hover/toggle:opacity-60">
                {open ? t(TOGGLE.close) : t(TOGGLE.open)}
              </span>
              <span
                aria-hidden="true"
                className="relative grid h-9 w-9 place-items-center rounded-full transition-colors duration-300"
                style={{ border: `1px solid ${lineCol}` }}
              >
                <span
                  className="absolute h-[1.5px] w-3.5"
                  style={{ background: "var(--wine)" }}
                />
                <motion.span
                  className="absolute h-3.5 w-[1.5px]"
                  style={{ background: "var(--wine)" }}
                  animate={{ scaleY: open ? 0 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
                />
              </span>
            </button>
          ) : (
            aside && <div className="shrink-0 text-right pt-2">{aside}</div>
          )}
        </div>

        {title ? (
          <h2
            className="mt-7 md:mt-9 font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,5.2vw,4.2rem)] max-w-[20ch]"
            style={{ color: ink }}
          >
            <RevealText key={`h-${number}-${locale}`} text={t(title)} />
          </h2>
        ) : null}

        <div className="mt-5 md:mt-7 grid grid-cols-4 gap-4 md:gap-8 items-start">
          {summary ? (
            <p
              key={`s-${number}-${locale}`}
              className="col-span-4 md:col-span-3 text-[15px] md:text-[17px] leading-[1.6] max-w-[60ch]"
              style={{ color: dark ? "var(--paper-on-dark)" : "var(--ink)" }}
            >
              {t(summary)}
            </p>
          ) : null}
          {meta ? (
            <div
              className="col-span-4 md:col-span-1 md:text-right font-mono text-[10px] uppercase tracking-[0.22em] md:pt-1"
              style={{ color: muted }}
            >
              {t(meta)}
            </div>
          ) : null}
        </div>

        {/* Animated rule — scales in from the left rather than fading */}
        <motion.span
          className="block mt-7 md:mt-9 h-px origin-left"
          style={{ background: lineCol }}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE_IN_OUT }}
        />
      </header>

      <motion.div
        id={contentId}
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: reduced ? 0 : 0.55,
          ease: EASE_IN_OUT,
          opacity: { duration: reduced ? 0 : open ? 0.5 : 0.2 },
        }}
        style={{ overflow: "hidden" }}
        inert={!open || undefined}
      >
        <div className="pt-12 md:pt-16">{children}</div>
      </motion.div>
    </>
  );

  return (
    <section
      id={id}
      className={cn("section", dark && "dark-block")}
      data-open={open}
    >
      {bleed ? Inner : <div className="shell">{Inner}</div>}
    </section>
  );
}
