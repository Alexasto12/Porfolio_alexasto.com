"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useTweaks } from "@/lib/tweaks";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

export function TimelineSection() {
  const { t, locale } = useI18n();
  const d = DATA.timeline;
  const { tweaks } = useTweaks();
  const compact = tweaks.timeline === "compact";
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (compact) return;
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = rail.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.78;
      const total = r.height + (start - vh * 0.22);
      const progressed = start - r.top;
      const p = Math.max(0, Math.min(1, progressed / total));
      fill.style.height = (p * 100).toFixed(2) + "%";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [compact, locale]);

  const kindLabel = (k: string) =>
    t(d.kindLabels[k as keyof typeof d.kindLabels] ?? d.kindLabels.milestone);

  return (
    <section
      id="recorrido"
      className="shell section"
      data-screen-label="Timeline / 004"
      style={{ paddingBottom: "clamp(56px,9vw,110px)" }}
    >
      <SectionHead num={d.num} label={d.label} heading={d.heading} description={d.description} />
      <div style={{ marginTop: "clamp(34px,5vw,64px)" }}>
        {compact ? (
          /* compact rows */
          <div style={{ display: "flex", flexDirection: "column" }}>
            {d.entries.map((e, i) => (
              <Reveal
                key={i}
                className="g4"
                style={{ borderTop: "1px solid var(--line)", padding: "18px 0", alignItems: "baseline" }}
              >
                <div className="col-1" style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span
                    className="font-display"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(1.6rem,3vw,2.4rem)",
                      letterSpacing: "-0.04em",
                      color: "var(--tw-accent)",
                      lineHeight: 1,
                    }}
                  >
                    {t(e.year)}
                  </span>
                  {e.age && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-soft)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t(e.age)}
                    </span>
                  )}
                </div>
                <div className="col-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="tl__kind" data-kind={e.kind}>
                      {kindLabel(e.kind)}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-soft)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t(e.place)}
                    </span>
                  </div>
                  <h3
                    key={`tt-${locale}-${i}`}
                    className="tl__title"
                    style={{ fontSize: "clamp(1.05rem,1.6vw,1.3rem)", marginBottom: "6px" }}
                  >
                    {t(e.title)}
                  </h3>
                  <p
                    key={`tb-${locale}-${i}`}
                    style={{
                      color: "var(--muted)",
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      maxWidth: "62ch",
                      textWrap: "pretty",
                    }}
                  >
                    {t(e.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          /* rail layout */
          <div className="tl" ref={railRef}>
            <div className="tl__rail">
              <div className="tl__rail-fill" ref={fillRef} style={{ height: "0%" }} />
            </div>
            {d.entries.map((e, i) => (
              <Reveal key={i} className="tl__row">
                <div className="tl__node">
                  <span className="tl__node-num font-display">{t(e.year)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span className="tl__kind" data-kind={e.kind}>
                    {kindLabel(e.kind)}
                  </span>
                  {e.age && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-soft)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t(e.age)}
                    </span>
                  )}
                  <span className="font-mono" style={{ fontSize: "10px", color: "var(--muted-faint)" }}>
                    · {t(e.place)}
                  </span>
                </div>
                <h3
                  key={`tt-${locale}-${i}`}
                  className="tl__title"
                  style={{ fontSize: "clamp(1.15rem,1.9vw,1.55rem)", marginBottom: "8px", maxWidth: "30ch" }}
                >
                  {t(e.title)}
                </h3>
                <p
                  key={`tb-${locale}-${i}`}
                  style={{
                    color: "var(--muted)",
                    fontSize: "14px",
                    lineHeight: 1.62,
                    maxWidth: "58ch",
                    textWrap: "pretty",
                  }}
                >
                  {t(e.body)}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
