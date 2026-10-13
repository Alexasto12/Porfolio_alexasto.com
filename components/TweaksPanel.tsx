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
  names,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  names: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <div className="tweaks__row" role="group" aria-label={label}>
      <span className="tweaks__label" aria-hidden>
        {label}
      </span>
      <div className="tweaks__opts">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className="tweaks__opt"
            aria-pressed={value === opt}
            data-on={value === opt}
            onClick={() => onChange(opt)}
          >
            {names[opt]}
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
  names,
  onChange,
}: {
  label: string;
  value: Accent;
  options: Accent[];
  names: string[];
  onChange: (v: Accent) => void;
}) {
  return (
    <div className="tweaks__row" role="group" aria-label={label}>
      <span className="tweaks__label" aria-hidden>
        {label}
      </span>
      <div className="tweaks__swatches">
        {options.map((opt, i) => (
          <button
            key={opt[0]}
            type="button"
            className="tweaks__swatch"
            aria-pressed={value[0] === opt[0]}
            data-on={value[0] === opt[0]}
            style={{ background: `linear-gradient(135deg, ${opt[0]}, ${opt[1]})` }}
            aria-label={names[i] ?? opt[0]}
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
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className="tweaks__toggle-btn"
      onClick={() => onChange(!value)}
    >
      <span className="tweaks__switch" data-on={value} aria-hidden />
      {label}
    </button>
  );
}

type Labels = {
  title: string;
  projects: string;
  cards: string;
  path: string;
  mode: string;
  brand: string;
  accent: string;
  grid: string;
  cardNames: Record<CardsLayout, string>;
  timelineNames: Record<TimelineMode, string>;
  /** Swatch names, in ACCENT_OPTIONS order. */
  accentNames: string[];
};

const LABELS: Record<Locale, Labels> = {
  es: {
    title: "Ajustes de diseño",
    projects: "Proyectos",
    cards: "Tarjetas",
    path: "Recorrido",
    mode: "Modo",
    brand: "Marca",
    accent: "Acento",
    grid: "Rejilla de fondo",
    cardNames: { stack: "Pila", split: "Partida", list: "Lista" },
    timelineNames: { rail: "Eje", compact: "Compacto" },
    accentNames: ["Granate", "Frambuesa", "Naranja", "Azul"],
  },
  ca: {
    title: "Ajustos de disseny",
    projects: "Projectes",
    cards: "Targetes",
    path: "Recorregut",
    mode: "Mode",
    brand: "Marca",
    accent: "Accent",
    grid: "Reixeta de fons",
    cardNames: { stack: "Pila", split: "Partida", list: "Llista" },
    timelineNames: { rail: "Eix", compact: "Compacte" },
    accentNames: ["Granat", "Gerd", "Taronja", "Blau"],
  },
  en: {
    title: "Design settings",
    projects: "Projects",
    cards: "Cards",
    path: "Path",
    mode: "Mode",
    brand: "Brand",
    accent: "Accent",
    grid: "Background grid",
    cardNames: { stack: "Stack", split: "Split", list: "List" },
    timelineNames: { rail: "Rail", compact: "Compact" },
    accentNames: ["Wine", "Raspberry", "Orange", "Blue"],
  },
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
      <div className="tweaks__panel" role="dialog" aria-label={L.title}>
        <TweakSection label={L.projects} />
        <TweakRadio<CardsLayout>
          label={L.cards}
          value={tweaks.cards}
          options={["stack", "split", "list"]}
          names={L.cardNames}
          onChange={(v) => setTweak("cards", v)}
        />
        <TweakSection label={L.path} />
        <TweakRadio<TimelineMode>
          label={L.mode}
          value={tweaks.timeline}
          options={["rail", "compact"]}
          names={L.timelineNames}
          onChange={(v) => setTweak("timeline", v)}
        />
        <TweakSection label={L.brand} />
        <TweakColor
          label={L.accent}
          value={tweaks.accent}
          options={ACCENT_OPTIONS}
          names={L.accentNames}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakToggle label={L.grid} value={tweaks.grid} onChange={(v) => setTweak("grid", v)} />
      </div>
    </div>
  );
}
