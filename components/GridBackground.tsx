"use client";

import { motion, useReducedMotion } from "motion/react";

export function GridBackground() {
  const reduced = useReducedMotion();
  const cols = [0, 1, 2, 3, 4];

  return (
    <div className="grid-bg" aria-hidden="true">
      {cols.map((i) =>
        i < 4 ? (
          <motion.div
            key={i}
            className="grid-bg__col"
            initial={reduced ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.1,
              delay: i * 0.08,
              ease: [0.7, 0, 0.2, 1],
            }}
          />
        ) : null
      )}
    </div>
  );
}
