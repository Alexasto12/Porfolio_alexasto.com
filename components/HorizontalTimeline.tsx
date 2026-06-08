"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useDrawOnView } from "@/lib/anime";
import { EASE_OUT } from "@/lib/motion";
import type { TimelineEntry } from "@/data/projects";
import { cn } from "@/lib/cn";

type Props = { entries: readonly TimelineEntry[] };

const KIND_COLOR: Record<NonNullable<TimelineEntry["kind"]>, string> = {
  milestone: "var(--wine)",
  education: "var(--muted)",
  work: "var(--wine)",
  project: "var(--ink)",
};

/* ───────── Shared station card ───────── */

function Station({
  entry,
  index,
  total,
  active,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
  active: boolean;
}) {
  const { t, locale } = useI18n();
  const year = typeof entry.year === "string" ? entry.year : t(entry.year);
  const dot = KIND_COLOR[entry.kind ?? "work"];

  return (
    <div className="relative w-[clamp(260px,78vw,400px)] lg:w-[clamp(320px,30vw,420px)] shrink-0 pt-9">
      {/* Node hanging from the top rail */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-9 w-px"
        style={{ background: "var(--line-strong)" }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: dot, boxShadow: "0 0 0 4px var(--paper)" }}
        animate={{ scale: active ? 1.5 : 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      />

      <div className="flex items-baseline gap-3">
        <motion.span
          className="font-display font-extrabold leading-[0.82] tracking-[-0.045em] text-[clamp(3.2rem,5vw,5rem)]"
          animate={{
            color: active ? "var(--wine)" : "var(--ink)",
          }}
          transition={{ duration: 0.4 }}
          style={{
            fontVariationSettings: active ? '"wght" 800' : '"wght" 700',
          }}
        >
          {year}
        </motion.span>
        <span
          className="font-mono text-[10px] tabular uppercase tracking-[0.18em]"
          style={{ color: "var(--muted)" }}
        >
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>

      {entry.age ? (
        <div
          key={`age-${index}-${locale}`}
          className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--muted)" }}
        >
          {typeof entry.age === "string" ? entry.age : t(entry.age)}
        </div>
      ) : null}

      <h3
        key={`t-${index}-${locale}`}
        className="mt-4 font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold leading-[1.18] tracking-[-0.01em] max-w-[26ch]"
      >
        {t(entry.title)}
      </h3>
      <div
        key={`p-${index}-${locale}`}
        className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: "var(--wine)" }}
      >
        {t(entry.place)}
      </div>
      <p
        key={`b-${index}-${locale}`}
        className="mt-3 text-[13.5px] md:text-[14.5px] leading-[1.6] max-w-[40ch]"
        style={{ color: "var(--ink)" }}
      >
        {t(entry.body)}
      </p>
    </div>
  );
}

/* ───────── Top rail (anime.js drawn line) ───────── */

function Rail({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement | null>;
}) {
  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute left-0 top-0 h-[2px] w-full"
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="1"
        x2="100"
        y2="1"
        stroke="var(--line-strong)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ───────── Pinned mode (desktop, scroll-driven horizontal) ───────── */

function PinnedTimeline({ entries }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<SVGSVGElement>(null);

  const [maxX, setMaxX] = useState(0);
  const [outerH, setOuterH] = useState(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      const mx = Math.max(0, track.scrollWidth - sticky.clientWidth);
      setMaxX(mx);
      setOuterH(window.innerHeight + mx);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [entries.length]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -(v * maxX));
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(entries.length - 1, Math.round(v * (entries.length - 1))));
  });

  const inView = useInView(outerRef, { once: true, amount: 0.2 });
  useDrawOnView(railRef, inView, { duration: 1500, ease: "inOutQuad" });

  return (
    <div ref={outerRef} style={{ height: outerH || undefined }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
      >
        <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span style={{ color: "var(--wine)" }}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span style={{ color: "var(--muted)" }}>
            / {String(entries.length).padStart(2, "0")} · scroll →
          </span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex items-start gap-10 lg:gap-16 pr-[20vw] will-change-transform"
        >
          <Rail svgRef={railRef} />
          {entries.map((e, i) => (
            <Station
              key={i}
              entry={e}
              index={i}
              total={entries.length}
              active={i === idx}
            />
          ))}
        </motion.div>

        {/* Scroll progress */}
        <div
          className="mt-12 h-px w-full origin-left"
          style={{ background: "var(--line)" }}
        >
          <motion.div
            className="h-px origin-left"
            style={{ scaleX: progressScaleX, background: "var(--wine)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Snap mode (touch / small / reduced-motion) ───────── */

function SnapTimeline({ entries }: Props) {
  const railRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.2 });
  useDrawOnView(railRef, inView, { duration: 1200, ease: "inOutQuad" });

  return (
    <div ref={wrapRef}>
      <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
        ← swipe · {String(entries.length).padStart(2, "0")} hitos →
      </div>
      <div className="h-snap no-scrollbar gap-10 pb-6 -mx-[var(--gutter)] px-[var(--gutter)]">
        <div className="relative flex items-start gap-10">
          <Rail svgRef={railRef} />
          {entries.map((e, i) => (
            <Station
              key={i}
              entry={e}
              index={i}
              total={entries.length}
              active={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Mode switch — SSR renders the accessible snap version ───────── */

export function HorizontalTimeline({ entries }: Props) {
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  return pinned ? (
    <PinnedTimeline entries={entries} />
  ) : (
    <SnapTimeline entries={entries} />
  );
}
