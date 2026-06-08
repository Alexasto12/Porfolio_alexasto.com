import type { Variants, Transition } from "motion/react";

/**
 * Shared motion vocabulary. The goal is to break away from the single
 * "fade + translate-y" reveal that reads as machine-generated, and offer a
 * small, coherent set of reveals (clip wipes, masks, scale, blur, slide)
 * that get used deliberately per section.
 */

type Bezier = [number, number, number, number];

export const EASE_OUT: Bezier = [0.2, 0.7, 0.2, 1];
export const EASE_IN_OUT: Bezier = [0.7, 0, 0.2, 1];

export const VIEWPORT = { once: true, amount: 0.25 } as const;

export function tOut(duration = 0.7, delay = 0): Transition {
  return { duration, delay, ease: EASE_OUT };
}

/** Parent that staggers its children's `show` state. */
export const staggerParent = (
  staggerChildren = 0.07,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: tOut(0.7) },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: tOut(0.7) },
};

/** Wipe up from a clipped bottom edge — good for big blocks and images. */
export const clipUp: Variants = {
  hidden: { opacity: 0, y: 42, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: tOut(0.9),
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: tOut(0.7) },
};

/** Returns a copy of the variant with an added delay on its `show` transition. */
export function withDelay(v: Variants, delay: number): Variants {
  if (!delay) return v;
  const show = v.show as { transition?: Transition } | undefined;
  return {
    ...v,
    show: {
      ...(show as object),
      transition: { ...(show?.transition ?? {}), delay },
    },
  };
}
