import {
  Award,
  BriefcaseBusiness,
  FolderGit2,
  Mail,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type SectionId =
  "about" | "projects" | "skills" | "experience" | "certifications" | "contact";

export type NavItem = {
  id: SectionId;
  label: string;
  /** Shorter label for the phone bottom bar. */
  shortLabel: string;
  icon: LucideIcon;
  /** Shown in the phone bottom bar (max 5 fit comfortably). */
  inMobileBar: boolean;
};

/** Home-page sections, in page order. */
export const navItems: NavItem[] = [
  {
    id: "about",
    label: "About",
    shortLabel: "About",
    icon: User,
    inMobileBar: true,
  },
  {
    id: "projects",
    label: "Projects",
    shortLabel: "Work",
    icon: FolderGit2,
    inMobileBar: true,
  },
  {
    id: "skills",
    label: "Skills",
    shortLabel: "Skills",
    icon: Wrench,
    inMobileBar: true,
  },
  {
    id: "experience",
    label: "Experience",
    shortLabel: "Journey",
    icon: BriefcaseBusiness,
    inMobileBar: true,
  },
  {
    id: "certifications",
    label: "Certifications",
    shortLabel: "Certs",
    icon: Award,
    inMobileBar: false,
  },
  {
    id: "contact",
    label: "Contact",
    shortLabel: "Contact",
    icon: Mail,
    inMobileBar: true,
  },
];

export const sectionIds = navItems.map((item) => item.id);
