"use client";

import { LazyMotion, m, type Variants } from "motion/react";
import { loadMotion } from "./ui/loadMotion";
import { useSequence } from "./ui/useSequence";

/* Geometry: 200 m = 110 units around the failed delivery. */
const C = { x: 240, y: 125 };
const R = 110;
/** The nearest neighbour, 46.9 m away (shown as 47 m, like the API example). */
const NEAREST = { x: 262, y: 111.5 };

/** Sample neighbours from a fixed-seed generator: always the same picture. */
const IN_CIRCLE = [
  [203, 137], [237, 75], [306, 101], [320, 195], [209, 36], [205, 201],
];
const IN_BOX = [
  [146, 202], [330, 28], [342, 223],
];
const OUTSIDE = [
  [90, 190], [151, 9], [401, 70], [365, 90], [57, 202], [410, 242], [321, 244], [422, 98],
];
const STREETS = "M0 52H480M0 160H480M0 238H480M70 0V250M180 0V250M300 0V250M420 0V250";

/** When each step starts, in seconds. */
const AT = [0, 0.9, 1.9, 2.9];

const pop: Variants = {
  hidden: { scale: 0, opacity: 0, transition: { duration: 0 } },
  final: { scale: 1, opacity: 1, transition: { duration: 0 } },
  play: (t: number) => ({ scale: 1, opacity: 1, transition: { delay: t, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] } }),
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  final: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
  play: (t: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: t, pathLength: { delay: t, duration: 0.8, ease: "easeInOut" }, opacity: { delay: t, duration: 0.01 } },
  }),
};
const dim: Variants = {
  hidden: { opacity: 1, transition: { duration: 0 } },
  final: { opacity: 0.25, transition: { duration: 0 } },
  play: (t: number) => ({ opacity: 0.25, transition: { delay: t, duration: 0.4 } }),
};
const fade: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  final: { opacity: 1, transition: { duration: 0 } },
  play: (t: number) => ({ opacity: 1, transition: { delay: t, duration: 0.4 } }),
};
/* The bars hold at 0 with keyframes instead of a delay: a delayed transform
   on an HTML element jumped straight to its end value. */
const bar: Variants = {
  hidden: { scaleX: 0, transition: { duration: 0 } },
  final: { scaleX: 1, transition: { duration: 0 } },
  play: (t: number) => ({
    scaleX: [0, 0, 1],
    transition: { duration: t + 0.6, times: [0, t / (t + 0.6), 1], ease: "easeOut" },
  }),
};

type NeibrDiagramProps = {
  title: string;
  note: string;
  steps: string[];
};

/**
 * How Neibr assigned a neighbour, in four steps that play once when the
 * diagram scrolls into view (motion/react). The server HTML, the no-JS page
 * and reduced motion all show the finished diagram.
 */
export function NeibrDiagram({ title, note, steps }: NeibrDiagramProps) {
  const [ref, phase] = useSequence<HTMLElement>(0.45);
  const anim = { initial: false as const, animate: phase };
  return (
    <LazyMotion features={loadMotion} strict>
      <figure ref={ref} className="ndiag" data-phase={phase}>
        <figcaption className="ndiag__caption">
          <span className="meta">{title}</span>
          <span className="ndiag__note">{note}</span>
        </figcaption>
        <svg className="ndiag__svg" viewBox="0 0 480 250" aria-hidden focusable="false">
          <path className="ndiag__streets" d={STREETS} />
          {OUTSIDE.map(([x, y]) => (
            <m.circle key={`o${x}`} className="ndiag__pt" cx={x} cy={y} r="5" variants={dim} custom={AT[1] + 0.6} {...anim} />
          ))}
          {IN_BOX.map(([x, y]) => (
            <m.circle key={`b${x}`} className="ndiag__pt" cx={x} cy={y} r="5" variants={dim} custom={AT[2] + 0.6} {...anim} />
          ))}
          {IN_CIRCLE.map(([x, y]) => (
            <circle key={`c${x}`} className="ndiag__pt" cx={x} cy={y} r="5" />
          ))}
          {/* 2. Bounding box prefilter */}
          <m.rect className="ndiag__box" x={C.x - R} y={C.y - R} width={R * 2} height={R * 2} variants={draw} custom={AT[1]} {...anim} />
          {/* 3. 200 m circle */}
          <m.circle className="ndiag__ring" cx={C.x} cy={C.y} r={R} variants={draw} custom={AT[2]} {...anim} />
          <m.text className="ndiag__label" x={C.x + 84} y={C.y - 84} variants={fade} custom={AT[2] + 0.6} {...anim}>
            200 m
          </m.text>
          {/* 4. Nearest neighbour and its distance */}
          <m.path className="ndiag__line" d={`M${C.x} ${C.y}L${NEAREST.x} ${NEAREST.y}`} variants={draw} custom={AT[3]} {...anim} />
          <m.circle className="ndiag__pt ndiag__pt--hit" cx={NEAREST.x} cy={NEAREST.y} r="7" variants={pop} custom={AT[3] + 0.3} {...anim} />
          <m.text className="ndiag__label ndiag__label--hit" x={NEAREST.x + 12} y={NEAREST.y - 10} variants={fade} custom={AT[3] + 0.4} {...anim}>
            47 m
          </m.text>
          {/* 1. Failed delivery */}
          <m.circle className="ndiag__origin" cx={C.x} cy={C.y} r="8" variants={pop} custom={AT[0]} {...anim} />
        </svg>
        <ol className="ndiag__steps">
          {steps.map((s, i) => (
            <li key={i}>
              <span className="ndiag__num data" aria-hidden>
                {i + 1}
              </span>
              <span>{s}</span>
              <m.span className="ndiag__bar" aria-hidden variants={bar} custom={AT[i]} {...anim} />
            </li>
          ))}
        </ol>
      </figure>
    </LazyMotion>
  );
}
