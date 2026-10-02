"use client";

import { m } from "motion/react";
import { usePathname } from "next/navigation";
import { navItems, sectionIds } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { SectionLink } from "./section-link";

const items = navItems.filter((item) => item.inMobileBar);

/** Bottom tab bar for phones and tablets (from the Stitch design). */
export function MobileNav() {
  const pathname = usePathname();
  const active = useActiveSection(sectionIds);

  return (
    <m.nav
      aria-label="Sections"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {items.map((item) => {
          const isActive = pathname === "/" && active === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative flex-1">
              <SectionLink
                sectionId={item.id}
                aria-current={isActive ? "true" : undefined}
                className={`relative z-10 flex flex-col items-center gap-1 py-2.5 font-mono text-[0.6875rem] tracking-wide transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  isActive ? "text-primary-text" : "text-fg-muted"
                }`}
              >
                <Icon className="size-5" aria-hidden />
                {item.shortLabel}
              </SectionLink>
              {isActive && (
                <m.span
                  layoutId="mobile-nav-active"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]"
                />
              )}
            </li>
          );
        })}
      </ul>
    </m.nav>
  );
}
