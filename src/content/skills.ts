/**
 * Grouped skills (D6: no percentage bars). `projects` lists the slugs from
 * projects.ts where the skill is visible, so the Skills section can link to
 * proof. Skills without a project are from coursework or the internship.
 */

export type Skill = { name: string; projects?: string[] };
export type SkillGroup = { id: string; label: string; skills: Skill[] };

const YSF = "project-ysf";
const PORTAL = "volunteers-portal";
const ROADSAFE = "roadsafe";
const WEBSITE = "ysf-website";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", projects: [YSF] },
      { name: "JavaScript", projects: [PORTAL, WEBSITE] },
      { name: "Python", projects: [PORTAL] },
      { name: "Dart", projects: [PORTAL] },
      { name: "PHP", projects: [WEBSITE] },
      { name: "Java" },
      { name: "C++" },
    ],
  },
  {
    id: "web",
    label: "Web",
    skills: [
      { name: "Next.js", projects: [YSF] },
      { name: "React", projects: [YSF] },
      { name: "Tailwind CSS", projects: [YSF] },
      { name: "Vue.js", projects: [WEBSITE] },
      { name: "HTML & CSS", projects: [YSF, PORTAL, WEBSITE] },
      { name: "REST APIs", projects: [YSF, PORTAL, WEBSITE] },
      { name: "FastAPI", projects: [PORTAL] },
      { name: "Progressive Web Apps", projects: [YSF] },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Flutter", projects: [PORTAL] },
      { name: "Riverpod", projects: [PORTAL] },
      { name: "Android" },
    ],
  },
  {
    id: "data",
    label: "Databases",
    skills: [
      { name: "PostgreSQL", projects: [YSF, PORTAL] },
      { name: "Prisma", projects: [YSF] },
      { name: "SQLAlchemy & Alembic", projects: [PORTAL] },
      { name: "MySQL / MariaDB", projects: [WEBSITE] },
      { name: "Database design", projects: [YSF, PORTAL, WEBSITE] },
    ],
  },
  {
    id: "testing",
    label: "Testing & QA",
    skills: [
      { name: "Unit & integration testing", projects: [YSF, PORTAL] },
      { name: "End-to-end testing (Playwright)", projects: [YSF] },
      { name: "pytest", projects: [PORTAL] },
      { name: "Vitest", projects: [YSF] },
      { name: "System validation", projects: [ROADSAFE] },
      { name: "User acceptance testing" },
    ],
  },
  {
    id: "security",
    label: "Security",
    skills: [
      { name: "Authentication & sessions", projects: [YSF, PORTAL, WEBSITE] },
      { name: "Password hashing", projects: [YSF, PORTAL, WEBSITE] },
      { name: "Role-based access control", projects: [YSF, PORTAL, WEBSITE] },
      { name: "CSRF protection", projects: [WEBSITE] },
      { name: "Rate limiting", projects: [YSF] },
      { name: "Signed tokens (Ed25519)", projects: [YSF] },
      { name: "Content Security Policy", projects: [YSF] },
    ],
  },
  {
    id: "embedded",
    label: "Embedded & AI",
    skills: [
      { name: "Raspberry Pi", projects: [ROADSAFE] },
      { name: "Linux", projects: [ROADSAFE] },
      { name: "Computer vision", projects: [ROADSAFE] },
      { name: "Edge AI", projects: [ROADSAFE] },
      { name: "Arduino" },
      { name: "ESP32" },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", projects: [YSF, PORTAL, ROADSAFE, WEBSITE] },
      { name: "GitHub Actions CI", projects: [YSF] },
      { name: "Vercel", projects: [YSF] },
      { name: "Docker", projects: [PORTAL] },
      { name: "Render & Railway", projects: [PORTAL] },
      { name: "VS Code" },
    ],
  },
];
