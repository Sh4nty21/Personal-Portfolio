"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True only in the browser, so the icon never mismatches the server render. */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const reduceMotion = useReducedMotion();
  const isDark = isClient && resolvedTheme === "dark";

  function toggle() {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid size-10 place-items-center overflow-hidden rounded-chip border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {isClient && (
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={isDark ? "moon" : "sun"}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: -90, scale: 0.5 }
            }
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotate: 90, scale: 0.5 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid place-items-center"
          >
            {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </m.span>
        </AnimatePresence>
      )}
    </button>
  );
}
