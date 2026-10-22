/* Syntax-highlighted API request and response for Neibr, shown as it is:
   an example, labelled as one, with no typing effect. */

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
  [["tok-punc", "}"]],
];

export function ApiTerminal({ title, label }: { title: string; label: string }) {
  return (
    <figure className="terminal">
      <figcaption className="terminal__bar">
        <span className="terminal__label">{label}</span>
        <span className="terminal__title">{title}</span>
      </figcaption>
      {/* Focusable so the horizontal scroll works from the keyboard. */}
      <pre className="terminal__body" tabIndex={0} role="region" aria-label={label}>
        <code>
          {LINES.map((segs, i) => (
            <span key={i} className="ln">
              {segs.map((seg, j) => (
                <span key={j} className={seg[0] || undefined}>
                  {seg[1]}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
