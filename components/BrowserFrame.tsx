"use client";

import { motion, useReducedMotion } from "motion/react";
import { clipUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  /** Real screenshot path (from /public). When absent, a labelled slot shows. */
  src?: string;
  alt?: string;
  /** Domain shown in the chrome URL bar, e.g. "larasoak.art". */
  domain?: string;
  /** Title used in the empty slot. */
  label: string;
  hint?: string;
  ratio?: string;
  className?: string;
};

/**
 * Browser-chrome frame for real project screenshots. Monochrome window dots
 * (not the cliché red/yellow/green) keep it on-brand. When no `src` is set it
 * shows a clearly-labelled, swappable slot — never a fabricated mockup.
 */
export function BrowserFrame({
  src,
  alt,
  domain,
  label,
  hint,
  ratio = "16 / 10",
  className,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.figure
      className={cn(
        "group relative w-full overflow-hidden rounded-[10px] shadow-window card-tilt",
        className
      )}
      style={{ border: "1px solid var(--line-strong)", background: "var(--paper)" }}
      variants={reduced ? undefined : clipUp}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full"
              style={{ border: "1px solid var(--line-strong)" }}
            />
          ))}
        </div>
        <div
          className="ml-2 flex-1 truncate rounded-[5px] px-3 py-1 font-mono text-[10.5px] tracking-[0.04em]"
          style={{
            background: "color-mix(in srgb, var(--ink) 5%, transparent)",
            color: "var(--muted)",
          }}
        >
          {domain ? (
            <>
              <span style={{ color: "var(--wine)" }}>↳ </span>
              {domain}
            </>
          ) : (
            label
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative" style={{ aspectRatio: ratio }}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt ?? label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <EmptySlot label={label} hint={hint} />
        )}
      </div>
    </motion.figure>
  );
}

function EmptySlot({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--ink) 4%, var(--paper)) 0%, color-mix(in srgb, var(--ink) 1%, var(--paper)) 100%)",
      }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`hatch-${label.replace(/\W/g, "")}`}
            patternUnits="userSpaceOnUse"
            width="14"
            height="14"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#hatch-${label.replace(/\W/g, "")})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--muted)" }}
        >
          ↳ {hint ?? "screenshot"}
        </span>
        <span
          className="font-display text-[clamp(0.95rem,1.8vw,1.2rem)] font-semibold tracking-[-0.01em]"
          style={{ color: "var(--ink)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
