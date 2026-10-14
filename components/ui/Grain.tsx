/**
 * Paper grain: SVG noise at a very low opacity, as an inline SVG rather than
 * a CSS background image, so the browser never takes it for the page's
 * largest image (LCP). The filter is defined once (GrainFilter).
 */
export function Grain() {
  return (
    <svg className="grain" aria-hidden focusable="false">
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}

/** The noise filter, once per page. */
export function GrainFilter() {
  return (
    <svg width="0" height="0" className="grain-defs" aria-hidden focusable="false">
      <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 .08 0 0 0 0 .07 0 0 0 0 .05 0 0 0 1 0" />
      </filter>
    </svg>
  );
}
