"use client";

import { useState } from "react";
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

/** Floating design panel: card layout, timeline mode, accent, grid. */
export function TweaksPanel() {
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);

  return (
    <div className="tweaks">
      {open && (
        <div className="tweaks__panel" role="dialog" aria-label="Tweaks">
          <TweakSection label="Proyectos" />
          <TweakRadio<CardsLayout>
            label="Layout cards"
            value={tweaks.cards}
            options={["stack", "split", "list"]}
            onChange={(v) => setTweak("cards", v)}
          />
          <TweakSection label="Recorrido" />
          <TweakRadio<TimelineMode>
            label="Timeline"
            value={tweaks.timeline}
            options={["rail", "compact"]}
            onChange={(v) => setTweak("timeline", v)}
          />
          <TweakSection label="Marca" />
          <TweakColor
            label="Acento"
            value={tweaks.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakToggle
            label="Rejilla de fondo"
            value={tweaks.grid}
            onChange={(v) => setTweak("grid", v)}
          />
        </div>
      )}
      <button
        type="button"
        className="tweaks__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        ⚙ Tweaks
      </button>
    </div>
  );
}
