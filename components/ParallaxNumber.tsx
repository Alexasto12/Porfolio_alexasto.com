"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** How much the number drifts as the section moves through the viewport. */
  range?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

/**
 * Scroll-driven gentle parallax wrapper used on big section numbers.
 * Movement is bounded so it never breaks alignment.
 */
export function ParallaxNumber({
  children,
  className,
  style,
  range = 28,
  ...rest
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.span
      ref={ref}
      style={{ ...style, y: reduced ? 0 : y, display: "inline-block" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
