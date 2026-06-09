/* Syntax-highlighted API request/response terminal for the Neibr feature. */

type Seg = [string, string];

const LINES: Seg[][] = [
  [["tok-com", "// POST /api/v1/b2b/shipments"]],
  [["tok-com", "// X-API-Key: pk_live_…   ·   tracking auto-generado"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"geo_lat"'], ["tok-punc", ": "], ["tok-num", "41.6079"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"geo_lng"'], ["tok-punc", ": "], ["tok-num", "2.2874"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"pickup_window_hours"'], ["tok-punc", ": "], ["tok-num", "48"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"expires_at"'], ["tok-punc", ": "], ["tok-str", '"2026-12-31T23:59:59Z"']],
  [["tok-punc", "}"]],
  [["", ""]],
  [["tok-com", "→ 201 Created · 38 ms"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"tracking_number"'], ["tok-punc", ": "], ["tok-str", '"DHL-000001-01042026"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"status"'], ["tok-punc", ": "], ["tok-str", '"ASSIGNED"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"seed_node"'], ["tok-punc", ": "], ["tok-str", '"node_3B"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"distance_m"'], ["tok-punc", ": "], ["tok-num", "47"]],
  [["tok-punc", "}"], ["caret", ""]],
];

export function ApiTerminal() {
  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="terminal__title">api.neibr.es — shipments.http</span>
        <span className="terminal__method">POST 201</span>
      </div>
      <div className="terminal__body">
        {LINES.map((segs, i) => (
          <span key={i} className="ln">
            {segs.map((seg, j) =>
              seg[0] === "caret" ? (
                <span key={j} className="caret" />
              ) : (
                <span key={j} className={seg[0]}>
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
