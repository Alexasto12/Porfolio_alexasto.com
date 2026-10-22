import data from "./shots.json";

/** One captured screenshot, written by `npm run capture`. */
export type ShotFile = { src: string; width: number; height: number; url: string };

/** Captured screenshots by card id. A card without an entry renders without a frame. */
export const SHOTS = data as Record<string, ShotFile | undefined>;
