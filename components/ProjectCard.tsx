"use client";

import { useI18n } from "@/lib/i18n";
import type { Project } from "@/lib/content";
import type { CardsLayout } from "@/lib/tweaks";
import { Reveal } from "./ui/Reveal";
import { Shot } from "./ui/Shot";
import { Tags } from "./ui/Tags";

type ProjectCardProps = {
  p: Project;
  index: number;
  layout: CardsLayout;
  flip: boolean;
};

export function ProjectCard({ p, index, layout, flip }: ProjectCardProps) {
  const { t, locale } = useI18n();

  const links = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginTop: "16px" }}>
      {p.links.length ? (
        p.links.map((ln, i) => (
          <a key={i} href={ln.href} target="_blank" rel="noreferrer" className="link-row">
            <span className="link-row__bar" />
            <span>{ln.label}</span>
          </a>
        ))
      ) : (
        <span
          className="font-mono"
          style={{
            fontSize: "11px",
            color: "var(--muted-faint)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          — internal —
        </span>
      )}
    </div>
  );

  const titleBlock = (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
        <span className="font-mono" style={{ fontSize: "11px", color: "var(--tw-accent)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(1.4rem,2.6vw,2rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
          }}
        >
          {p.name}
        </h3>
        {p.sub && (
          <span
            key={`sub-${locale}`}
            className="font-mono"
            style={{
              fontSize: "11px",
              color: "var(--muted-soft)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {t(p.sub)}
          </span>
        )}
      </div>
      <p
        key={`pd-${locale}`}
        style={{
          marginTop: "14px",
          color: "var(--muted)",
          fontSize: "14.5px",
          lineHeight: 1.62,
          textWrap: "pretty",
        }}
      >
        {t(p.description)}
      </p>
      <div style={{ marginTop: "16px" }}>
        <Tags items={p.tags} />
      </div>
      {links}
    </div>
  );

  if (layout === "list") {
    return (
      <Reveal
        className="g4"
        style={{ borderTop: "1px solid var(--line)", padding: "clamp(20px,3vw,32px) 0", alignItems: "start" }}
      >
        <div className="col-1">
          <Shot label={p.shotLabel} dim={p.dim} ratio="4 / 3" />
        </div>
        <div className="col-3">{titleBlock}</div>
      </Reveal>
    );
  }

  if (layout === "split") {
    const shotCol = (
      <div className="col-2">
        <Shot label={p.shotLabel} dim={p.dim} ratio="16 / 10" />
      </div>
    );
    const textCol = (
      <div className="col-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {titleBlock}
      </div>
    );
    return (
      <Reveal
        className="g4"
        style={{ paddingBottom: "clamp(36px,5vw,64px)", alignItems: "stretch" }}
      >
        {flip ? (
          <>
            {textCol}
            {shotCol}
          </>
        ) : (
          <>
            {shotCol}
            {textCol}
          </>
        )}
      </Reveal>
    );
  }

  /* stack (default) */
  return (
    <Reveal
      delay={String((index % 2) + 1)}
      className="col-2 panel card-tilt"
      style={{ padding: "clamp(16px,2vw,22px)", display: "flex", flexDirection: "column" }}
    >
      <Shot label={p.shotLabel} dim={p.dim} ratio="16 / 10" />
      <div style={{ marginTop: "18px" }}>{titleBlock}</div>
    </Reveal>
  );
}
