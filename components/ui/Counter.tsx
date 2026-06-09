"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  duration?: number;
  format?: boolean;
};

/** Animated counter that runs on scroll-in, with an offscreen fallback. */
export function Counter({ to, duration = 1700, format = true }: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }
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
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // If rAF is paused (offscreen capture/export context), the first frame
      // never fires — jump to the final value so the number is never stuck at 0.
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
  }, [to, duration]);

  const display = format ? val.toLocaleString("es-ES") : val;
  return (
    <span ref={ref} className="tabular">
      {display}
    </span>
  );
}
