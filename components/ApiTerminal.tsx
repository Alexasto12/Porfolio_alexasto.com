"use client";

/* Syntax-highlighted API request and response for the Neibr block. When it
   scrolls into view the request types itself out, one character at a time
   (clip-path in steps), and the response arrives after it. CSS transitions
   on data-phase do the animation (app/styles/base.css). Server HTML, no JS
   and reduced motion: complete. */
import type { CSSProperties } from "react";
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

/** Per-line timing for the CSS: delay, duration and, for typed lines, one step per character. */
function timing(i: number): CSSProperties {
  if (i < REQUEST_LINES) {
    const { t, n } = TYPING[i];
    return { "--d": `${t.toFixed(3)}s`, "--dur": `${(n * PER_CHAR).toFixed(3)}s`, "--n": n } as CSSProperties;
  }
  return { "--d": `${(RESPONSE_AT + (i - REQUEST_LINES) * 0.06).toFixed(3)}s` } as CSSProperties;
}

export function ApiTerminal({ title, label }: { title: string; label: string }) {
  const [ref, phase] = useSequence<HTMLDivElement>();
  return (
    <div className="terminal" ref={ref} data-phase={phase}>
      <div className="terminal__bar">
        <span className="terminal__title">{title}</span>
        <span className="terminal__method">POST 201</span>
      </div>
      {/* Focusable so the horizontal scroll works from the keyboard. */}
      <div className="terminal__body" tabIndex={0} role="region" aria-label={label}>
        {LINES.map((segs, i) => (
          <span key={i} className={i < REQUEST_LINES ? "ln ln--type" : "ln ln--arrive"} style={timing(i)}>
            {segs.map((seg, j) =>
              seg[0] === "caret" ? (
                <span key={j} className="caret" aria-hidden />
              ) : (
                <span key={j} className={seg[0] || undefined}>
                  {seg[1]}
                </span>
              )
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
