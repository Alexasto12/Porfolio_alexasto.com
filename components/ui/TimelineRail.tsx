"use client";

import { useEffect, useRef } from "react";

/**
 * Vertical rail whose fill follows the scroll through its parent list.
 * Hidden in the compact timeline (CSS) and static with reduced motion.
 */
export function TimelineRail() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const list = fill?.parentElement?.parentElement;
    if (!fill || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.78;
      const total = r.height + (start - vh * 0.22);
      const p = Math.max(0, Math.min(1, (start - r.top) / total));
      fill.style.height = (p * 100).toFixed(2) + "%";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="tl__rail" aria-hidden>
      <div className="tl__rail-fill" ref={fillRef} style={{ height: "0%" }} />
    </div>
  );
}
