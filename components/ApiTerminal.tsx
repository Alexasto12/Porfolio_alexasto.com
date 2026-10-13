"use client";

/* Syntax-highlighted API request and response for the Neibr block. When it
   scrolls into view the request types itself out and the response arrives
   after it (motion/react). Server HTML, no JS and reduced motion: complete. */
import { LazyMotion, m, type Variants } from "motion/react";
import { loadMotion } from "./ui/loadMotion";
import { useSequence } from "./ui/useSequence";

type Seg = [string, string];

const LINES: Seg[][] = [
  [["tok-com", "// POST /api/v1/b2b/shipments"]],
  [["tok-com", "// X-API-Key: pk_live_…"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"geo_lat"'], ["tok-punc", ": "], ["tok-num", "41.6079"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"geo_lng"'], ["tok-punc", ": "], ["tok-num", "2.2874"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"pickup_window_hours"'], ["tok-punc", ": "], ["tok-num", "48"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"expires_at"'], ["tok-punc", ": "], ["tok-str", '"2026-12-31T23:59:59Z"']],
  [["tok-punc", "}"]],
  [["", " "]],
  [["tok-com", "→ 201 Created"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"tracking_number"'], ["tok-punc", ": "], ["tok-str", '"CARRIER-000001-01042026"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"status"'], ["tok-punc", ": "], ["tok-str", '"ASSIGNED"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"seed_node"'], ["tok-punc", ": "], ["tok-str", '"node_3B"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"distance_m"'], ["tok-punc", ": "], ["tok-num", "47"]],
  [["tok-punc", "}"], ["caret", ""]],
];
/** Lines before this index are the request (typed); the rest is the response. */
const REQUEST_LINES = 8;
const PER_CHAR = 0.014;

/** Start time and length of each typed line. */
const TYPING = (() => {
  let t = 0;
  return LINES.slice(0, REQUEST_LINES).map((segs) => {
    const n = Math.max(1, segs.reduce((len, [, text]) => len + text.length, 0));
    const line = { t, n };
    t += n * PER_CHAR + 0.06;
    return line;
  });
})();
const RESPONSE_AT = TYPING[TYPING.length - 1].t + TYPING[TYPING.length - 1].n * PER_CHAR + 0.4;

const type: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0 } },
  final: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0 } },
  play: ({ t, n }: { t: number; n: number }) => ({
    clipPath: "inset(0 0% 0 0)",
    // One step per character: a typewriter, not a wipe.
    transition: { delay: t, duration: n * PER_CHAR, ease: (p: number) => Math.floor(p * n) / n },
  }),
};
const arrive: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  final: { opacity: 1, transition: { duration: 0 } },
  play: (t: number) => ({ opacity: 1, transition: { delay: t, duration: 0.25 } }),
};

export function ApiTerminal({ title, label }: { title: string; label: string }) {
  const [ref, phase] = useSequence<HTMLDivElement>(0.5);
  return (
    <LazyMotion features={loadMotion} strict>
      <div className="terminal" ref={ref} data-phase={phase}>
        <div className="terminal__bar">
          <span className="terminal__title">{title}</span>
          <span className="terminal__method">POST 201</span>
        </div>
        {/* Focusable so the horizontal scroll works from the keyboard. */}
        <div className="terminal__body" tabIndex={0} role="region" aria-label={label}>
          {LINES.map((segs, i) => (
            <m.span
              key={i}
              className="ln"
              initial={false}
              animate={phase}
              variants={i < REQUEST_LINES ? type : arrive}
              custom={i < REQUEST_LINES ? TYPING[i] : RESPONSE_AT + (i - REQUEST_LINES) * 0.06}
            >
              {segs.map((seg, j) =>
                seg[0] === "caret" ? (
                  <span key={j} className="caret" aria-hidden />
                ) : (
                  <span key={j} className={seg[0] || undefined}>
                    {seg[1]}
                  </span>
                )
              )}
            </m.span>
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
