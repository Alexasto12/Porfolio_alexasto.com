"use client";

import type { CSSProperties } from "react";
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
const at = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

type NeibrDiagramProps = {
  title: string;
  steps: string[];
};

/**
 * How Neibr assigned a neighbour, in four steps that play once when the
 * diagram scrolls into view: the failed delivery, the bounding box, the
 * 200 m circle and the nearest neighbour. CSS transitions on data-phase do
 * the animation (app/styles/experience.css). The server HTML, the no-JS page
 * and reduced motion all show the finished diagram.
 */
export function NeibrDiagram({ title, steps }: NeibrDiagramProps) {
  const [ref, phase] = useSequence<HTMLElement>();
  return (
    <figure ref={ref} className="ndiag" data-phase={phase}>
      <figcaption className="ndiag__caption">{title}</figcaption>
      <svg className="ndiag__svg" viewBox="0 0 480 250" aria-hidden focusable="false">
        <path className="ndiag__streets" d={STREETS} />
        {OUTSIDE.map(([x, y]) => (
          <circle key={`o${x}`} className="ndiag__pt ndiag__dim" cx={x} cy={y} r="5" style={at(AT[1] + 0.6)} />
        ))}
        {IN_BOX.map(([x, y]) => (
          <circle key={`b${x}`} className="ndiag__pt ndiag__dim" cx={x} cy={y} r="5" style={at(AT[2] + 0.6)} />
        ))}
        {IN_CIRCLE.map(([x, y]) => (
          <circle key={`c${x}`} className="ndiag__pt" cx={x} cy={y} r="5" />
        ))}
        {/* 2. Bounding box prefilter */}
        <rect className="ndiag__box ndiag__draw" x={C.x - R} y={C.y - R} width={R * 2} height={R * 2} pathLength="1" style={at(AT[1])} />
        {/* 3. 200 m circle: the area fades in while its edge draws */}
        <circle className="ndiag__area ndiag__fade" cx={C.x} cy={C.y} r={R} style={at(AT[2])} />
        <circle className="ndiag__ring ndiag__draw" cx={C.x} cy={C.y} r={R} pathLength="1" style={at(AT[2])} />
        {/* Outside the box, to its right, so no line or point crosses it. */}
        <text className="ndiag__label ndiag__fade" x={C.x + R + 8} y={C.y - 84} style={at(AT[2] + 0.6)}>
          200 m
        </text>
        {/* 4. Nearest neighbour and its distance */}
        <path className="ndiag__line ndiag__draw" d={`M${C.x} ${C.y}L${NEAREST.x} ${NEAREST.y}`} pathLength="1" style={at(AT[3])} />
        <circle className="ndiag__pt ndiag__pt--hit ndiag__pop" cx={NEAREST.x} cy={NEAREST.y} r="7" style={at(AT[3] + 0.3)} />
        {/* Above and to the left of the hit, where there are no points. */}
        <text
          className="ndiag__label ndiag__label--hit ndiag__fade"
          x={NEAREST.x - 6}
          y={NEAREST.y - 14}
          textAnchor="end"
          style={at(AT[3] + 0.4)}
        >
          47 m
        </text>
        {/* 1. Failed delivery */}
        <circle className="ndiag__origin ndiag__pop" cx={C.x} cy={C.y} r="8" style={at(AT[0])} />
      </svg>
      <ol className="ndiag__steps">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="ndiag__num data" aria-hidden>
              {i + 1}
            </span>
            <span>{s}</span>
            <span className="ndiag__bar" aria-hidden style={at(AT[i])} />
          </li>
        ))}
      </ol>
    </figure>
  );
}
