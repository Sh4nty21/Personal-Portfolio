"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin violet→crimson bar that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-primary via-primary to-accent"
    />
  );
}
