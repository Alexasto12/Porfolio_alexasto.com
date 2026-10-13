"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  /** BCP 47 tag used to format the number (grouping and decimal separator). */
  locale?: string;
  decimals?: number;
  duration?: number;
};

/**
 * Count-up number. The server HTML (and anyone without JS) gets the final
 * value; the animation only runs in the browser and is skipped entirely with
 * prefers-reduced-motion.
 */
export function Counter({ to, locale = "es-ES", decimals = 0, duration = 1700 }: CounterProps) {
  const [val, setVal] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = Math.pow(10, decimals);
    const run = () => {
      if (started.current) return;
      started.current = true;
      setVal(0);
      let firstFired = false;
      const t0 = performance.now();
      const tick = (now: number) => {
        firstFired = true;
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased * step) / step);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // If rAF is paused (offscreen capture/export context), the first frame
      // never fires: jump to the final value so the number is never stuck at 0.
      setTimeout(() => {
        if (!firstFired) setVal(to);
      }, 160);
    };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    if (inView()) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    const fallback = setTimeout(run, 1800);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [to, decimals, duration]);

  const display = val.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className="tabular">
      {display}
    </span>
  );
}
