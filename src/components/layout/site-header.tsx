"use client";

import { Download } from "lucide-react";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, sectionIds } from "@/content/navigation";
import { profile } from "@/content/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { SectionLink } from "./section-link";

export function SiteHeader() {
  const pathname = usePathname();
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <m.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/80" : "border-transparent bg-bg/40"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <SectionLink
          sectionId="top"
          className="group flex items-center gap-3 rounded-chip focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src={profile.photos.formal}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover object-top ring-1 ring-line-strong transition-shadow duration-300 group-hover:shadow-[0_0_16px_var(--glow)]"
          />
          <span className="font-display leading-tight font-semibold">
            <span className="sm:hidden">{profile.shortName}</span>
            <span className="hidden sm:inline">{profile.name}</span>
          </span>
        </SectionLink>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === "/" && active === item.id;
              return (
                <li key={item.id} className="relative">
                  <SectionLink
                    sectionId={item.id}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-chip px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </SectionLink>
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                      className="absolute inset-0 rounded-chip border border-line-strong bg-surface-2"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className="hidden items-center gap-2 rounded-chip bg-primary-solid px-4 py-2 font-mono text-xs font-semibold tracking-wide text-white uppercase shadow-[0_0_20px_-6px_var(--glow)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_0_24px_-4px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
          >
            <Download className="size-4" aria-hidden />
            Resume
          </a>
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgress />
    </m.header>
  );
}
