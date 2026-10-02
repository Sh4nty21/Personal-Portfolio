"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Pulls its child gently toward the mouse while hovered (§7 "magnetic"
 * buttons). Mouse only; does nothing for touch or reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  /** Fraction of the cursor's offset from centre to follow. */
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const spring = { stiffness: 250, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onPointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      {children}
    </m.span>
  );
}
