"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n-types";
import {
  ACCENT_OPTIONS,
  useTweaks,
  type Accent,
  type CardsLayout,
  type TimelineMode,
} from "@/lib/tweaks";

function TweakSection({ label }: { label: string }) {
  return <div className="tweaks__section">{label}</div>;
}

function TweakRadio<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="tweaks__row">
      <span className="tweaks__label">{label}</span>
      <div className="tweaks__opts">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className="tweaks__opt"
            data-on={value === opt}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function TweakColor({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: Accent;
  options: Accent[];
  onChange: (v: Accent) => void;
}) {
  return (
    <div className="tweaks__row">
      <span className="tweaks__label">{label}</span>
      <div className="tweaks__swatches">
        {options.map((opt) => (
          <button
            key={opt[0]}
            type="button"
            className="tweaks__swatch"
            data-on={value[0] === opt[0]}
            style={{ background: `linear-gradient(135deg, ${opt[0]}, ${opt[1]})` }}
            aria-label={opt[0]}
            onClick={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  );
}

function TweakToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button type="button" className="tweaks__toggle-btn" onClick={() => onChange(!value)}>
      <span className="tweaks__switch" data-on={value} />
      {label}
    </button>
  );
}

const LABELS: Record<Locale, Record<"projects" | "cards" | "path" | "brand" | "accent" | "grid", string>> = {
  es: { projects: "Proyectos", cards: "Tarjetas", path: "Recorrido", brand: "Marca", accent: "Acento", grid: "Rejilla de fondo" },
  ca: { projects: "Projectes", cards: "Targetes", path: "Recorregut", brand: "Marca", accent: "Accent", grid: "Reixeta de fons" },
  en: { projects: "Projects", cards: "Cards", path: "Path", brand: "Brand", accent: "Accent", grid: "Background grid" },
};

/** Floating design panel: card layout, timeline mode, accent, grid. Ctrl+Shift+E to show/hide. */
export function TweaksPanel({ locale }: { locale: Locale }) {
  const L = LABELS[locale];
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "E") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="tweaks">
      <div className="tweaks__panel" role="dialog" aria-label="Tweaks">
        <TweakSection label={L.projects} />
        <TweakRadio<CardsLayout>
          label={L.cards}
          value={tweaks.cards}
          options={["stack", "split", "list"]}
          onChange={(v) => setTweak("cards", v)}
        />
        <TweakSection label={L.path} />
        <TweakRadio<TimelineMode>
          label={L.path}
          value={tweaks.timeline}
          options={["rail", "compact"]}
          onChange={(v) => setTweak("timeline", v)}
        />
        <TweakSection label={L.brand} />
        <TweakColor
          label={L.accent}
          value={tweaks.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakToggle
          label={L.grid}
          value={tweaks.grid}
          onChange={(v) => setTweak("grid", v)}
        />
      </div>
    </div>
  );
}
