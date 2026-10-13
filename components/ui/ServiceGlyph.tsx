/**
 * One glyph per service line, drawn in the diagram stroke (1.5 px, round
 * ends). Paths carry pathLength="1" so CSS can draw them in as they scroll
 * into view (app/styles/now.css); without that they are simply there.
 */
export function ServiceGlyph({ kind }: { kind: number }) {
  return (
    <svg className="glyph" viewBox="0 0 64 64" width="64" height="64" aria-hidden focusable="false">
      {kind === 0 && (
        /* Websites: a browser window. */
        <>
          <rect x="6" y="12" width="52" height="40" rx="3" pathLength="1" />
          <path d="M6 21H58" pathLength="1" />
          <path d="M11 16.5h.01M15 16.5h.01M19 16.5h.01" />
          <path d="M14 30H40M14 37H48M14 44H31" pathLength="1" />
        </>
      )}
      {kind === 1 && (
        /* Social media: a grid of posts. */
        <>
          {[7, 25, 43].flatMap((y) =>
            [7, 25, 43].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="14" height="14" rx="2" pathLength="1" />)
          )}
        </>
      )}
      {kind === 2 && (
        /* Automations: two nodes and an arrow that goes and comes back, again and again. */
        <>
          <circle cx="11" cy="32" r="7" pathLength="1" />
          <circle cx="53" cy="32" r="7" pathLength="1" />
          <path d="M16 26C25 13 39 13 48 26" pathLength="1" />
          <path d="M48 26l-5-1.5M48 26l.5-5.2" />
          <path d="M48 38C39 51 25 51 16 38" pathLength="1" />
          <path d="M16 38l5 1.5M16 38l-.5 5.2" />
        </>
      )}
      {kind === 3 && (
        /* Custom software: two pieces that fit together. */
        <>
          <path d="M9 18H29V27a5 5 0 0 1 0 10V46H9Z" pathLength="1" />
          <g className="glyph__slide">
            <path d="M31 18H55V46H31V37a5 5 0 0 0 0-10Z" pathLength="1" />
          </g>
        </>
      )}
    </svg>
  );
}
