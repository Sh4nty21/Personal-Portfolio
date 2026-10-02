import { Camera, ExternalLink, PlayCircle } from "lucide-react";
import { GitHubIcon } from "@/components/brand-icons";
import { ButtonLink } from "@/components/ui/button-link";
import type { Project, ProjectLink } from "@/content/projects";

const linkIcon: Record<ProjectLink["kind"], React.ReactNode> = {
  live: <ExternalLink className="size-4" aria-hidden />,
  repo: <GitHubIcon className="size-4" />,
  video: <PlayCircle className="size-4" aria-hidden />,
};

/**
 * The project's proof — live demo and/or source code (D21). Projects with no
 * public link (RoadSafe, D23) say so plainly instead of showing nothing.
 */
export function ProofLinks({
  project,
  size = "sm",
}: {
  project: Project;
  size?: "sm" | "md";
}) {
  if (project.links.length === 0) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-fg-dim">
        <Camera className="size-4" aria-hidden />
        Hardware project — shown through photos of the working prototype
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {project.links.map((link, i) => (
          <ButtonLink
            key={link.href}
            href={link.href}
            external
            size={size}
            variant={i === 0 ? "primary" : "ghost"}
          >
            {linkIcon[link.kind]}
            {link.label}
          </ButtonLink>
        ))}
      </div>
      {project.links[0].note && (
        <p className="text-xs text-fg-dim">{project.links[0].note}</p>
      )}
    </div>
  );
}
