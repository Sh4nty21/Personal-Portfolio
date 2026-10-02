"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { highlights, type Highlight } from "@/content/home";

const format = new Intl.NumberFormat("en-US");

/** Counts from 0 to the value once it scrolls into view (§7). */
function CountUp({ value, suffix }: Pick<Highlight, "value" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {/* Screen readers get the final number, not every frame. */}
      <span aria-hidden>
        {format.format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {format.format(value)}
        {suffix}
      </span>
    </span>
  );
}

export function Highlights() {
  return (
    <section
      aria-label="Highlights"
      className="border-y border-line bg-surface/60"
    >
      <Stagger
        as="ul"
        className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 sm:px-8 lg:grid-cols-4"
      >
        {highlights.map((item) => (
          <StaggerItem
            as="li"
            key={item.label}
            className="px-2 py-8 sm:px-4 md:py-10"
          >
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-fg md:text-5xl">
              <CountUp value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-2 font-mono text-xs tracking-[0.06em] text-primary-text uppercase">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-fg-dim">{item.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
