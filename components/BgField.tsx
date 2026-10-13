"use client";

import { useTweaks } from "@/lib/tweaks";

/** Fixed background: radial glow and optional column grid. */
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
    </div>
  );
}
