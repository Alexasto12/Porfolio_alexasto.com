type ShotProps = {
  label: string;
  dim?: string;
  ratio?: string;
};

/** Striped placeholder for a project screenshot (crosshair + caption). */
export function Shot({ label, dim = "1440×900", ratio = "16 / 10" }: ShotProps) {
  return (
    <figure className="shot" style={{ aspectRatio: ratio }}>
      <svg className="shot__crosshair" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth={1} />
        <circle cx={12} cy={12} r={5} stroke="currentColor" strokeWidth={1} />
      </svg>
      <figcaption className="shot__cap">
        <span style={{ color: "var(--accent-text)" }} aria-hidden>
          ▦
        </span>
        <b>{label}</b>
        <span className="shot__dim">{dim}</span>
      </figcaption>
    </figure>
  );
}
