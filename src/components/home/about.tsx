import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { about } from "@/content/home";

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title="Building complete systems, from real problems."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-fg-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>
        <Stagger
          as="ul"
          className="divide-y divide-line self-start rounded-card border border-line bg-surface"
        >
          {about.facts.map((fact) => (
            <StaggerItem
              as="li"
              key={fact.label}
              className="flex flex-col gap-0.5 px-5 py-4"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-fg-dim uppercase">
                {fact.label}
              </span>
              <span className="text-fg">{fact.value}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
