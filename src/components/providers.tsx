"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

const loadMotionFeatures = () =>
  import("./motion/features").then((mod) => mod.default);

/**
 * App-wide client providers:
 * - next-themes: light + dark (D4), defaults to the visitor's system setting.
 * - LazyMotion: components use the light `m.*` elements; the animation engine
 *   loads separately after the first paint (`strict` flags any full `motion.*`
 *   import that would pull it back into the main bundle).
 * - MotionConfig reducedMotion="user": when the visitor turns on "reduce
 *   motion", Motion drops movement and keeps only fades (§7).
 * - Lenis smooth scrolling; it also handles in-page anchor links and turns
 *   itself off for reduced motion (respectReducedMotion defaults to true).
 *   Sections clear the sticky header with CSS `scroll-mt-20`, which Lenis
 *   honours — so no extra Lenis offset (that would double it).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <ReactLenis
            root
            options={{
              autoRaf: true,
              lerp: 0.1,
              anchors: true,
              stopInertiaOnNavigate: true,
            }}
          >
            {children}
          </ReactLenis>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
