"use client";

import { useI18n, type Translatable } from "@/lib/i18n";

type ShotProps = {
  label: Translatable;
  dim: string;
  ratio?: string;
  minH?: number | string;
};

/** Striped placeholder for a project screenshot (crosshair + caption). */
export function Shot({ label, dim, ratio = "16 / 10", minH }: ShotProps) {
  const { t } = useI18n();
  return (
    <figure
      className="shot"
      style={{ aspectRatio: minH ? undefined : ratio, minHeight: minH }}
    >
      <svg className="shot__crosshair" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth={1} />
        <circle cx={12} cy={12} r={5} stroke="currentColor" strokeWidth={1} />
      </svg>
      <figcaption className="shot__cap">
        <span style={{ color: "var(--tw-accent)" }}>▦</span>
        <b>{t(label)}</b>
        <span className="shot__dim">{dim}</span>
      </figcaption>
    </figure>
  );
}
