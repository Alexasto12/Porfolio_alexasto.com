import type { CSSProperties } from "react";
import Image from "next/image";
import { SHOTS } from "@/lib/shots";

type BrowserFrameProps = {
  /** Capture id in lib/shots.json (the card id). */
  id: string;
  /** Localized alt text for the capture. */
  alt: string;
  /** `sizes` for next/image, matched to the frame's width in its layout. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** The frame shows a 16:10 window of the capture: the first screen. */
const FRAME_RATIO = 10 / 16;

/**
 * A browser window drawn in CSS: a thin bar with the domain, and the real
 * capture inside. Captures taller than the window scroll to their bottom on
 * hover (CSS only, never with reduced motion). Renders nothing if the site
 * has no capture.
 */
export function BrowserFrame({ id, alt, sizes, priority, className = "" }: BrowserFrameProps) {
  const shot = SHOTS[id];
  if (!shot) return null;
  const domain = new URL(shot.url).host.replace(/^www\./, "");
  const ratio = shot.height / shot.width;
  // How far to move the image so its bottom meets the bottom of the window.
  const shift = ratio > FRAME_RATIO + 0.01 ? `${(-(1 - FRAME_RATIO / ratio) * 100).toFixed(2)}%` : null;
  return (
    <figure className={`bframe ${className}`.trim()} data-scrolls={shift ? "" : undefined}>
      <div className="bframe__bar">
        <span className="bframe__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="bframe__url">{domain}</span>
      </div>
      <div className="bframe__view" style={shift ? ({ "--shift": shift } as CSSProperties) : undefined}>
        <Image
          className="bframe__img"
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={alt}
          sizes={sizes}
          priority={priority}
        />
      </div>
    </figure>
  );
}
