import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Architecture } from "@/components/case-study/architecture";
import { CodeBlock } from "@/components/case-study/code-block";
import { Gallery } from "@/components/case-study/gallery";
import { ProjectMedia } from "@/components/home/project-media";
import {
  PageTransition,
  projectMediaTransitionName,
} from "@/components/motion/page-transition";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProofLinks } from "@/components/proof-links";
import { caseStudyExtras } from "@/content/case-studies";
import { getProject, projects } from "@/content/projects";

/** Only the four known projects exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { images: [{ url: project.cover.src }] },
  };
}

function Block({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase">
            {`// ${label}`}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <Stagger as="ul" className="space-y-3">
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item}
          className="flex gap-3 text-lg leading-relaxed text-fg-muted"
        >
          <span
            aria-hidden
            className="mt-3 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default async function CaseStudyPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const extras = caseStudyExtras[project.slug];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageTransition>
      <article className="mx-auto w-full max-w-6xl px-4 pt-8 pb-8 sm:px-8 md:pt-12">
        <Link
          href="/#projects"
          transitionTypes={["nav-back"]}
          className="group inline-flex items-center gap-2 rounded-chip font-mono text-xs tracking-wide text-fg-muted uppercase hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-1"
            aria-hidden
          />
          All projects
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase">
              {project.kind}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] md:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              {project.tagline}
            </p>
            <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.06em] text-fg-dim uppercase">
              {project.status}
            </p>
            <div className="mt-6">
              <ProofLinks project={project} size="md" />
            </div>
          </Reveal>
          <ViewTransition
            name={projectMediaTransitionName(project.slug)}
            share="morph"
            default="none"
          >
            <div className="overflow-hidden rounded-feature border border-line-strong shadow-[0_0_60px_-16px_var(--glow)]">
              <ProjectMedia
                image={project.cover}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </ViewTransition>
        </header>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-info"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12">
          <Block label="Problem" title="Why it exists">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg-muted">
                {project.problem}
              </p>
            </Reveal>
          </Block>

          <Block label="Features" title="What I built">
            <BulletList items={project.built} />
          </Block>

          {extras && (
            <Block label="Architecture" title="How it fits together">
              <Architecture layers={extras.architecture} />
            </Block>
          )}

          <Block label="Engineering" title="How I built it">
            <BulletList items={project.how} />
          </Block>

          {extras?.snippet && (
            <Block label="Code" title="A look at the code">
              <Reveal>
                <p className="mb-4 text-fg-muted">
                  {extras.snippet.title}{" "}
                  <span className="text-fg-dim">
                    ({extras.snippet.language} · excerpt, trimmed for length)
                  </span>
                </p>
                <CodeBlock snippet={extras.snippet} />
              </Reveal>
            </Block>
          )}

          {project.challenges.length > 0 && (
            <Block label="Challenges" title="Problems I solved">
              <Stagger className="grid gap-4">
                {project.challenges.map((challenge) => (
                  <StaggerItem
                    key={challenge.title}
                    className="rounded-card border border-line bg-surface p-6"
                  >
                    <h3 className="font-display text-lg font-semibold">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-fg-muted">
                      {challenge.body}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>
          )}

          {project.role && (
            <Block label="My role" title="What I did">
              <Reveal>
                <p className="text-lg leading-relaxed text-fg-muted">
                  {project.role}
                </p>
              </Reveal>
            </Block>
          )}

          <Block label="Gallery" title="Screenshots & photos">
            <Gallery images={project.gallery} name={project.name} />
          </Block>
        </div>

        <nav
          aria-label="More projects"
          className="mt-4 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${previous.slug}`}
            transitionTypes={["nav-back"]}
            className="group rounded-card border border-line bg-surface p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-fg-dim uppercase">
              <ArrowLeft
                className="size-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
              Previous project
            </span>
            <span className="mt-1 block font-display text-lg font-semibold">
              {previous.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            transitionTypes={["nav-forward"]}
            className="group rounded-card border border-line bg-surface p-5 text-right transition-[border-color,transform] hover:-translate-y-0.5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-fg-dim uppercase">
              Next project
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
            <span className="mt-1 block font-display text-lg font-semibold">
              {next.name}
            </span>
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
}
