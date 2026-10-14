import type { VmvNode } from "@/lib/content";
import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

type Pt = { x: number; y: number };
type Layout = {
  viewBox: string;
  nodes: Record<VmvNode, Pt>;
  /** Connectors, drawn in this order as the map scrolls in. */
  links: { d: string; step: 1 | 2 | 3 }[];
  joints: Pt[];
  bus: { x: number; y: number; anchor: "start" | "middle" };
};

const W = 150;
const H = 40;

/** Wide: a horizontal bus, four nodes above and four below. */
const WIDE: Layout = {
  viewBox: "0 0 730 300",
  nodes: {
    waf: { x: 95, y: 50 },
    domains: { x: 275, y: 50 },
    ai: { x: 455, y: 50 },
    sign: { x: 635, y: 50 },
    erp: { x: 95, y: 250 },
    bridge: { x: 275, y: 250 },
    pdf: { x: 455, y: 250 },
    whatsapp: { x: 635, y: 250 },
  },
  links: [
    { d: "M20 150H710", step: 1 },
    { d: "M275 150V70", step: 2 },
    { d: "M275 150V230", step: 2 },
    { d: "M455 150V70", step: 2 },
    { d: "M455 150V230", step: 2 },
    { d: "M635 150V70", step: 2 },
    { d: "M635 150V230", step: 2 },
    { d: "M170 50H200", step: 3 },
    { d: "M170 250H200", step: 3 },
  ],
  joints: [275, 455, 635].map((x) => ({ x, y: 150 })),
  /* Left of the first spoke, so no line crosses the label. */
  bus: { x: 20, y: 138, anchor: "start" },
};

/** Narrow: a vertical bus with the nodes on both sides. */
const TALL: Layout = {
  viewBox: "0 0 340 600",
  nodes: {
    waf: { x: 80, y: 60 },
    domains: { x: 80, y: 160 },
    erp: { x: 80, y: 420 },
    bridge: { x: 80, y: 520 },
    ai: { x: 260, y: 160 },
    sign: { x: 260, y: 260 },
    pdf: { x: 260, y: 360 },
    whatsapp: { x: 260, y: 460 },
  },
  links: [
    { d: "M170 30V565", step: 1 },
    { d: "M170 160H155", step: 2 },
    { d: "M170 520H155", step: 2 },
    { d: "M170 160H185", step: 2 },
    { d: "M170 260H185", step: 2 },
    { d: "M170 360H185", step: 2 },
    { d: "M170 460H185", step: 2 },
    { d: "M80 80V140", step: 3 },
    { d: "M80 440V500", step: 3 },
  ],
  joints: [160, 260, 360, 460, 520].map((y) => ({ x: 170, y })),
  bus: { x: 170, y: 590, anchor: "middle" },
};

function MapSvg({ layout, labels, bus, className }: { layout: Layout; labels: Record<VmvNode, string>; bus: string; className: string }) {
  return (
    <svg className={`vmap__svg ${className}`} viewBox={layout.viewBox} aria-hidden focusable="false">
      {layout.links.map((l, i) => (
        <path key={i} className={`vmap__link vmap__link--${l.step}`} d={l.d} pathLength="1" />
      ))}
      {layout.joints.map((j, i) => (
        <circle key={i} className="vmap__joint" cx={j.x} cy={j.y} r="4" />
      ))}
      <text className="vmap__bus" x={layout.bus.x} y={layout.bus.y} textAnchor={layout.bus.anchor}>
        {bus}
      </text>
      {(Object.keys(layout.nodes) as VmvNode[]).map((k) => {
        const n = layout.nodes[k];
        return (
          <g key={k} className="vmap__node">
            <rect x={n.x - W / 2} y={n.y - H / 2} width={W} height={H} rx="4" />
            <text x={n.x} y={n.y + 5} textAnchor="middle">
              {labels[k]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * VMV system map: generic nodes, no internal names. Connectors draw in as the
 * map scrolls into view (CSS view timeline, app/styles/experience.css). The
 * SVG is decorative; the legend next to it carries the same information.
 */
export function VmvMap({ locale, legendId }: { locale: Locale; legendId: string }) {
  const t = translator(locale);
  const d = DATA.experience.vmv;
  const labels = Object.fromEntries(
    (Object.keys(d.mapNodes) as VmvNode[]).map((k) => [k, t(d.mapNodes[k])])
  ) as Record<VmvNode, string>;
  return (
    <figure className="vmap" aria-describedby={legendId}>
      <figcaption className="vmap__title meta">{t(d.mapTitle)}</figcaption>
      <MapSvg layout={WIDE} labels={labels} bus={t(d.mapBus)} className="vmap__svg--wide" />
      <MapSvg layout={TALL} labels={labels} bus={t(d.mapBus)} className="vmap__svg--tall" />
    </figure>
  );
}
