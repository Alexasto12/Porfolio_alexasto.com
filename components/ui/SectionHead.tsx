import { Reveal } from "./Reveal";

type SectionHeadProps = {
  num: string;
  label: string;
  heading?: string;
  description?: string;
};

/** Section header: number + label, plus an optional heading/description row. */
export function SectionHead({ num, label, heading, description }: SectionHeadProps) {
  return (
    <div className="section-head">
      <Reveal className="section__head">
        <div style={{ display: "flex", alignItems: "baseline", gap: "18px", flexWrap: "wrap" }}>
          <span className="section__num font-display" aria-hidden>
            {num}
            <span className="dot-accent">.</span>
          </span>
          <span className="section__label">{label}</span>
        </div>
      </Reveal>
      {heading && (
        <Reveal delay="1" className="g4" style={{ marginTop: "clamp(24px,4vw,48px)", alignItems: "end" }}>
          <h2
            className="col-3 font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {heading}
          </h2>
          {description && (
            <p
              className="col-1"
              style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.62, textWrap: "pretty" }}
            >
              {description}
            </p>
          )}
        </Reveal>
      )}
    </div>
  );
}
