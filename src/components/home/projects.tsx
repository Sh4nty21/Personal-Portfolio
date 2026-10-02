import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <Section
      id="projects"
      label="Selected work"
      title="Projects you can open and check."
      intro="Each project links to its live demo or its source code on GitHub, so you can see the real thing — not just screenshots."
    >
      <Stagger className="grid gap-6 md:grid-cols-2" gap={0.12}>
        {projects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
