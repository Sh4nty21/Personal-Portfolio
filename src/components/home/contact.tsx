"use client";

import { Check, Copy, Download, Mail } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import { ContactForm } from "./contact-form";

const channels = [
  {
    label: "LinkedIn",
    value: "Sean Marcus V. Tomas",
    href: profile.links.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "github.com/Sh4nty21",
    href: profile.links.github,
    icon: GitHubIcon,
  },
];

/** Contact links (D17) and the message form (step 7). */
export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's work together."
      intro="Have a role in mind or a question about my work? Email me — I usually reply within a day."
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-feature border border-line-strong bg-surface p-7 shadow-[0_0_60px_-20px_var(--glow)] sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/15 blur-3xl"
          />
          <Mail className="size-6 text-primary-text" aria-hidden />
          <p className="mt-4 font-mono text-xs tracking-[0.08em] text-fg-dim uppercase">
            Email
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 block font-display text-xl font-semibold break-all text-fg hover:text-primary-text sm:text-2xl"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink href={`mailto:${profile.email}`}>
                <Mail className="size-4" aria-hidden />
                Send an email
              </ButtonLink>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-chip border border-line-strong bg-surface px-5 py-3 font-mono text-xs font-semibold tracking-wide text-fg uppercase transition-[transform,border-color,color] hover:-translate-y-0.5 hover:border-primary hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" aria-hidden />
                  ) : (
                    <Copy className="size-4" aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy email"}
                </m.span>
              </AnimatePresence>
            </button>
          </div>
          <p role="status" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </p>
        </Reveal>

        <Stagger className="grid gap-4" gap={0.1}>
          {channels.map(({ label, value, href, icon: Icon }) => (
            <StaggerItem key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-card border border-line bg-surface p-5 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_16px_32px_-16px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="grid size-11 place-items-center rounded-chip bg-surface-2 text-fg-muted group-hover:text-primary-text">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className="block font-mono text-xs text-fg-dim">
                    {value}
                  </span>
                </span>
              </a>
            </StaggerItem>
          ))}
          <StaggerItem>
            <a
              href={profile.resume.href}
              download={profile.resume.fileName}
              className="group flex items-center gap-4 rounded-card border border-line bg-surface p-5 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_16px_32px_-16px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="grid size-11 place-items-center rounded-chip bg-surface-2 text-fg-muted group-hover:text-primary-text">
                <Download className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">Resume</span>
                <span className="block font-mono text-xs text-fg-dim">
                  PDF download
                </span>
              </span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
      <Reveal className="mt-5">
        <ContactForm />
      </Reveal>
    </Section>
  );
}
