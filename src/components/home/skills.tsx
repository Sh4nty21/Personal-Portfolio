"use client";

import { m } from "motion/react";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

const ALL = "all";
const filters = [
  { id: ALL, label: "All skills" },
  ...projects.map((p) => ({ id: p.slug, label: p.name })),
];

/**
 * Grouped skills (D6: no percentage bars). Picking a project highlights the
 * skills that project proves and dims the rest.
 */
export function Skills() {
  const [active, setActive] = useState<string>(ALL);

  return (
    <Section
      id="skills"
      label="Skills & stack"
      title="What I work with — and where you can see it."
      intro="Pick a project to highlight the skills it uses."
    >
      <div
        role="group"
        aria-label="Highlight skills by project"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter.id)}
              className={`relative shrink-0 rounded-chip px-3.5 py-2 font-mono text-xs tracking-wide whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                selected ? "text-white" : "text-fg-muted hover:text-fg"
              }`}
            >
              {selected && (
                <m.span
                  layoutId="skills-filter"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-chip bg-primary-solid"
                />
              )}
              {!selected && (
                <span className="absolute inset-0 rounded-chip border border-line bg-surface" />
              )}
              <span className="relative">{filter.label}</span>
            </button>
          );
        })}
      </div>

      <Stagger
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        gap={0.06}
      >
        {skillGroups.map((group) => (
          <StaggerItem
            key={group.id}
            className="rounded-card border border-line bg-surface p-5"
          >
            <h3 className="font-display text-lg font-semibold">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => {
                const lit =
                  active === ALL || (skill.projects ?? []).includes(active);
                return (
                  <m.li
                    key={skill.name}
                    animate={{ opacity: lit ? 1 : 0.3, scale: lit ? 1 : 0.96 }}
                    transition={{ duration: 0.25 }}
                    className={`rounded-chip border px-2 py-1 font-mono text-[0.6875rem] ${
                      lit && active !== ALL
                        ? "border-line-strong bg-primary/10 text-primary-text"
                        : "border-line bg-surface-2 text-fg-muted"
                    }`}
                  >
                    {skill.name}
                  </m.li>
                );
              })}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
