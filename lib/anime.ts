"use client";

import { useEffect, type RefObject } from "react";
import { animate, createDrawable, stagger } from "animejs";

/** SSR-safe reduced-motion check. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Draws every stroked SVG geometry inside `ref` the first time `active`
 * becomes true, using anime.js v4 `createDrawable`. Honors reduced motion
 * (the geometry is simply left fully drawn).
 */
export function useDrawOnView(
  ref: RefObject<SVGSVGElement | null>,
  active: boolean,
  opts: {
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
  } = {}
) {
  const { duration = 1100, delay = 0, stagger: stg, ease = "inOutQuad" } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active || prefersReducedMotion()) return;

    const targets = el.querySelectorAll<SVGGeometryElement>(
      "path, line, polyline, circle, rect, ellipse"
    );
    if (!targets.length) return;

    const drawables = createDrawable(targets);
    const anim = animate(drawables, {
      draw: ["0 0", "0 1"],
      duration,
      delay: stg ? stagger(stg, { start: delay }) : delay,
      ease,
    });

    return () => {
      anim.revert();
    };
  }, [ref, active, duration, delay, stg, ease]);
}
