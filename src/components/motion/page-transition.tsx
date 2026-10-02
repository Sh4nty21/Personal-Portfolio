import { ViewTransition } from "react";

/**
 * Directional page slide (§7): links tagged `nav-forward` (home → case study)
 * slide the new page in from the right; `nav-back` slides it in from the left.
 * Untagged navigations (browser back button, refresh) don't animate.
 * Must wrap each page.tsx, not the layout — layouts persist across navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

/** Name shared by a project's card image and its case-study header (morph). */
export function projectMediaTransitionName(slug: string) {
  return `project-media-${slug}`;
}
