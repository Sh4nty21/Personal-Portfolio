"use client";

import { useEffect, useState } from "react";

/** How far down the screen a section's top must pass to count as "current". */
const ACTIVATION_LINE = 0.4;

/**
 * Returns the id of the section the visitor is reading, so the nav can
 * highlight it. `null` while still above the first section (the hero).
 *
 * Reads positions on scroll (once per frame) rather than with an
 * IntersectionObserver, which can miss the end of a fast smooth-scroll jump.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const line = window.innerHeight * ACTIVATION_LINE;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && ids.length > 0) current = ids[ids.length - 1];
      setActive(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
