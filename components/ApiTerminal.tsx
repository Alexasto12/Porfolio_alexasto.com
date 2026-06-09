/* Syntax-highlighted API request/response terminal for the Neibr feature. */

type Seg = [string, string];

const LINES: Seg[][] = [
  [["tok-com", "// POST /api/v1/b2b/shipments  ·  X-API-Key"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"carrier"'], ["tok-punc", ": "], ["tok-str", '"SEUR_BCN_04"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"failed_address"'], ["tok-punc", ": "], ["tok-str", '"C/ Anselm Clavé 12"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"radius_m"'], ["tok-punc", ": "], ["tok-num", "200"]],
  [["tok-punc", "}"]],
  [["", ""]],
  [["tok-com", "→ 201 Created · 38 ms"]],
  [["tok-punc", "{"]],
  [["tok-punc", "  "], ["tok-key", '"tracking"'], ["tok-punc", ": "], ["tok-str", '"NBR-004821-09062026"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"neighbour"'], ["tok-punc", ": "], ["tok-str", '"unit_3B"'], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"distance_m"'], ["tok-punc", ": "], ["tok-num", "47"], ["tok-punc", ","]],
  [["tok-punc", "  "], ["tok-key", '"status"'], ["tok-punc", ": "], ["tok-str", '"assigned"']],
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
