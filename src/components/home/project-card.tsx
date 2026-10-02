"use client";

import { ArrowRight } from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { ViewTransition } from "react";
import { projectMediaTransitionName } from "@/components/motion/page-transition";
import { ProofLinks } from "@/components/proof-links";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "./project-media";

const MAX_TILT = 4; // degrees
const VISIBLE_STACK = 6;

/** Project card with a gentle cursor tilt and its proof links up front (D21). */
export function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]),
    spring,
  );

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    // Mouse only: touch screens scroll, they shouldn't tilt.
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const extraStack = project.stack.length - VISIBLE_STACK;
  const caseStudyHref = `/projects/${project.slug}`;

  return (
    <m.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      aria-labelledby={`project-${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-feature border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_24px_48px_-16px_var(--glow)]"
    >
      {/* Same link as the title; hidden from the tab order to avoid a duplicate stop. */}
      <Link
        href={caseStudyHref}
        transitionTypes={["nav-forward"]}
        tabIndex={-1}
        aria-hidden
      >
        <ViewTransition
          name={projectMediaTransitionName(project.slug)}
          share="morph"
          default="none"
        >
          <div>
            <ProjectMedia
              image={project.cover}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </ViewTransition>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-accent-text uppercase">
          {project.kind}
        </p>
        <h3
          id={`project-${project.slug}`}
          className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]"
        >
          <Link
            href={caseStudyHref}
            transitionTypes={["nav-forward"]}
            className="rounded-chip hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-fg-muted">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, VISIBLE_STACK).map((tech) => (
            <li
              key={tech}
              className="rounded-chip border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.6875rem] text-info"
            >
              {tech}
            </li>
          ))}
          {extraStack > 0 && (
            <li className="rounded-chip px-2 py-0.5 font-mono text-[0.6875rem] text-fg-dim">
              +{extraStack} more
            </li>
          )}
        </ul>

        <div className="mt-auto pt-6">
          <ProofLinks project={project} />
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-dim uppercase">
              {project.status}
            </p>
            <Link
              href={caseStudyHref}
              transitionTypes={["nav-forward"]}
              aria-label={`Read the ${project.name} case study`}
              className="group/link inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold tracking-wide text-primary-text uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Case study
              <ArrowRight
                className="size-4 transition-transform group-hover/link:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </m.article>
  );
}
