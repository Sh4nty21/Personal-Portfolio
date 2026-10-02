"use client";

import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { timeline } from "@/content/experience";

/** Timeline whose line draws itself as the visitor scrolls (§7). */
export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <Section
      id="experience"
      label="Experience & education"
      title="Where I've worked and studied."
    >
      <ol ref={listRef} className="relative space-y-10 pl-10 sm:pl-14">
        {/* Track + animated fill */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[15px] w-px bg-line sm:left-[19px]"
        />
        <m.span
          aria-hidden
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-linear-to-b from-primary to-accent sm:left-[19px]"
        />

        {timeline.map((entry) => {
          const Icon =
            entry.kind === "work" ? BriefcaseBusiness : GraduationCap;
          return (
            <Reveal
              as="li"
              key={`${entry.org}-${entry.period}`}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute top-0 -left-10 grid size-8 place-items-center rounded-full border border-line-strong bg-surface text-primary-text shadow-[0_0_16px_-4px_var(--glow)] sm:-left-14 sm:size-10"
              >
                <Icon className="size-4" />
              </span>
              <article className="rounded-card border border-line bg-surface p-6">
                <p className="font-mono text-xs tracking-[0.06em] text-primary-text uppercase">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.01em]">
                  {entry.title}
                </h3>
                <p className="mt-1 text-fg-muted">
                  {entry.org} · {entry.place}
                </p>
                <ul className="mt-4 space-y-2 text-fg-muted">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {entry.tags && (
                  <ul
                    className="mt-5 flex flex-wrap gap-1.5"
                    aria-label="Highlights"
                  >
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-chip border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.6875rem] text-info"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
