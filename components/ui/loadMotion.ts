/**
 * One shared loader for the motion features. LazyMotion gets it as its
 * `features`, and useSequence waits for it before resetting anything, so a
 * sequence never hides its content before motion can animate it back.
 */
let loading: Promise<typeof import("@/lib/motion-features").default> | null = null;

export function loadMotion() {
  loading ??= import("@/lib/motion-features").then((mod) => mod.default);
  return loading;
}
