/** Experience & education timeline, newest first. */

export type TimelineEntry = {
  kind: "work" | "education";
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    title: "BS Computer Engineering",
    org: "Bulacan State University – Bustos Campus",
    place: "Bustos, Bulacan",
    period: "2022 – 2026",
    points: [
      "Academic Scholar.",
      "Class Mayor, 2023–2026.",
      "Capstone thesis: Design and Development of an Edge AI-Based Driver Monitoring and Intervention System for Real-Time Alertness Evaluation (RoadSafe).",
    ],
    tags: ["Academic Scholar", "Class Mayor"],
  },
  {
    kind: "work",
    title: "Computer Engineering Intern — Pre-Sales Engineer",
    org: "Nimbus Technologies Inc.",
    place: "Makati City",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Installed, configured, tested and maintained desktop computers, biometric systems and servers.",
      "Performed system validation, preventive maintenance, technical inspections and troubleshooting of deployed equipment.",
      "Prepared technical documentation and reports, and supported product demonstrations and technical training.",
      "Earned five vendor certifications during the internship (Fortinet, Dahua, Microsoft ExpertZone).",
    ],
    tags: ["Systems", "Hardware", "Documentation"],
  },
];
