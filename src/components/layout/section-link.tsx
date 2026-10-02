"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  sectionId: string;
};

/**
 * Link to a home-page section. Home: plain anchor (Lenis handles it).
 * Elsewhere: client-side navigation home with the "back" page slide.
 */
export function SectionLink({
  sectionId,
  children,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <a href={`#${sectionId}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${sectionId}`} transitionTypes={["nav-back"]} {...props}>
      {children}
    </Link>
  );
}
