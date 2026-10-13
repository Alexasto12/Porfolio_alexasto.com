import data from "./shots.json";

/** One captured screenshot, written by `npm run capture`. */
export type ShotFile = { src: string; width: number; height: number; url: string };

/** Captured screenshots by card id. A card without an entry renders without a frame. */
export const SHOTS = data as Record<string, ShotFile | undefined>;

/** `sizes` for a card image: full width on one column, about 600px on two. */
export const CARD_IMAGE_SIZES = "(max-width: 860px) calc(100vw - 72px), 600px";
