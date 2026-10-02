"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

const links = [
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: Mail,
    external: false,
  },
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: profile.links.github,
    label: "GitHub",
    icon: GitHubIcon,
    external: true,
  },
];

export function SiteFooter() {
  const lenis = useLenis();

  function backToTop() {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  }

  return (
    <footer className="mt-24 border-t border-line">
      <Reveal className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-fg-muted">{profile.role}</p>
          <p className="mt-1 text-sm text-fg-dim">{profile.location}</p>
          <ul className="mt-5 flex gap-2">
            {links.map(({ href, label, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid size-10 place-items-center rounded-chip border border-line bg-surface text-fg-muted transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-line-strong hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={backToTop}
          className="group inline-flex items-center gap-2 self-start rounded-chip border border-line bg-surface px-4 py-2 font-mono text-xs tracking-wide text-fg-muted uppercase transition-colors hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:self-auto"
        >
          <ArrowUp
            className="size-4 transition-transform group-hover:-translate-y-0.5"
            aria-hidden
          />
          Back to top
        </button>
      </Reveal>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-5 font-mono text-xs text-fg-dim sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with Next.js, Tailwind CSS &amp; Motion</p>
        </div>
      </div>
    </footer>
  );
}
