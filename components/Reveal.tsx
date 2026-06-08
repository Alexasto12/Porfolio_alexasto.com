"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, withDelay } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Which reveal to use. Defaults to a gentle rise. */
  variants?: Variants;
  delay?: number;
  amount?: number;
  /** Stagger children that are themselves `motion` items with `variants`. */
  stagger?: boolean;
};

/**
 * Convenience wrapper for in-view reveals. Falls back to a static element
 * when the user prefers reduced motion. Use `variants` to pick from the
 * shared vocabulary in `lib/motion` instead of hand-rolling fade-ups.
 */
export function Reveal({
  children,
  className,
  style,
  variants = fadeUp,
  delay = 0,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

type RevealTextProps = {
  text: string;
  className?: string;
  /** Element to render — heading levels etc. */
  as?: React.ElementType;
  delay?: number;
  perWord?: number;
  amount?: number;
};

/**
 * Editorial word-by-word mask reveal: each word rises out of its own
 * overflow-hidden box. Distinct from a uniform fade — reads as typeset
 * motion rather than a generated transition.
 */
export function RevealText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  perWord = 0.045,
  amount = 0.5,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "112%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount }}
            transition={{
              duration: 0.8,
              delay: delay + i * perWord,
              ease: [0.2, 0.7, 0.2, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
