"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin page-scroll progress bar pinned to the top edge. Scroll-linked
 * (not an autoplaying animation), so it stays meaningful with reduced motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left"
      style={{ scaleX, background: "var(--wine)" }}
    />
  );
}
