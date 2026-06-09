"use client";

import { useTweaks } from "@/lib/tweaks";

/** Fixed background: radial glow, optional column grid and grain noise. */
export function BgField() {
  const { tweaks } = useTweaks();
  return (
    <div className="bg-field" aria-hidden>
      <div className="bg-glow" />
      {tweaks.grid && (
        <div className="bg-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="bg-noise" />
    </div>
  );
}
