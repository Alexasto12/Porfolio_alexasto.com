"use client";

import { useTweaks } from "@/lib/tweaks";

/** Fixed background: optional column grid. The glow lives in the hero. */
export function BgField() {
  const { tweaks } = useTweaks();
  return (
    <div className="bg-field" aria-hidden>
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
