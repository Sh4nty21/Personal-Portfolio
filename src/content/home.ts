/** Hero, highlights and About copy. */

export const hero = {
  greeting: "Hi, I'm Sean.",
  role: "Computer Engineer · Full-Stack & Mobile Developer",
  headline: {
    before: "I build ",
    highlight: "web and mobile apps",
    after: " that real people depend on — from the database to the screen.",
  },
  intro:
    "Computer Engineering graduate from Bulacan State University. I've built check-in, attendance and event systems for a youth sports ministry, and an Edge AI driver-monitoring device for my capstone thesis.",
  status: "Open to junior software / web developer roles",
};

export type Highlight = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

/** Count-up numbers (§7). All verifiable — see the `detail` source. */
export const highlights: Highlight[] = [
  {
    value: 4,
    label: "Projects built",
    detail:
      "Project YSF, YSF Volunteers Portal, RoadSafe and the Elevate YSF Website",
  },
  {
    value: 3200,
    suffix: "+",
    label: "Automated tests",
    detail: "Unit, integration and end-to-end tests in Project YSF",
  },
  {
    value: 5,
    label: "Certifications",
    detail: "Fortinet ×2, Dahua and Microsoft ExpertZone ×2",
  },
  {
    value: 3,
    label: "Years as Class Mayor",
    detail: "Bulacan State University, 2023–2026",
  },
];

export const about = {
  paragraphs: [
    "I'm a Computer Engineer who enjoys building complete systems — the database, the API, the interface, and sometimes the hardware underneath. Most of my work starts from a real problem: my church's youth sports fellowship needed a faster way to check in dozens of players every Saturday and form fair teams, so I built it.",
    "I care about the parts users never see: role-based access, secure sign-in, automated tests, and apps that keep working when the internet doesn't. I'm looking for a junior software or web development role where I can keep learning from experienced engineers and ship things that matter.",
  ],
  facts: [
    { label: "Degree", value: "BS Computer Engineering" },
    { label: "University", value: "Bulacan State University, 2022–2026" },
    { label: "Honors", value: "Academic Scholar" },
    { label: "Leadership", value: "Class Mayor, 2023–2026" },
    { label: "Based in", value: "Baliwag City, Bulacan — willing to relocate" },
  ],
};
