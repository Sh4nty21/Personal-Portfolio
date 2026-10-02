/*
 * Project case studies — source: Sean's resume, the public
 * GitHub repos and the Project YSF codebase. Every claim here must be true.
 * Anything still unconfirmed by Sean is left OUT of
 * the text and tracked as a `TODO(confirm)` comment instead.
 */

export type ProjectLink = {
  kind: "live" | "repo" | "video";
  label: string;
  href: string;
  /** Short note shown under the button, e.g. "Demo data is fictional". */
  note?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Phone screenshots get a phone frame; desktop ones a browser frame. */
  frame: "browser" | "phone" | "photo";
};

export type Project = {
  slug: string;
  name: string;
  /** Small label above the title. */
  kind: string;
  status: string;
  tagline: string;
  stack: string[];
  links: ProjectLink[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  problem: string;
  built: string[];
  how: string[];
  challenges: { title: string; body: string }[];
  role?: string;
};

export const projects: Project[] = [
  {
    slug: "project-ysf",
    name: "Project YSF",
    kind: "Full-stack web platform · Personal project",
    status: "In progress · Live demo",
    tagline:
      "A full-stack platform that runs a youth sports ministry's events end to end — registration, signed QR passes, offline check-in, attendance and safety incidents.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Vercel",
    ],
    links: [
      {
        kind: "live",
        label: "Open live demo",
        href: "https://project-ysf.vercel.app",
        note: "Demo data is fictional · source code is private",
      },
    ],
    cover: {
      src: "/images/projects/project-ysf/dashboard.jpg",
      alt: "Project YSF admin dashboard showing confirmed participants, upcoming sessions, open incidents and an attendance trend chart",
      width: 1343,
      height: 945,
      frame: "browser",
    },
    gallery: [
      {
        src: "/images/projects/project-ysf/sign-in.jpg",
        alt: "Project YSF sign-in page with the ministry mission and 1 Timothy 4:8",
        width: 1913,
        height: 933,
        frame: "browser",
      },
      {
        src: "/images/projects/project-ysf/dashboard.jpg",
        alt: "Project YSF admin dashboard with stat cards and attendance trend chart",
        width: 1343,
        height: 945,
        frame: "browser",
      },
    ],
    problem:
      "Elevate YSF runs weekly basketball, volleyball and badminton sessions for young people. Registration, guardian consent, attendance and incident reports lived in group chats and paper lists, so staff couldn't easily see who was registered, who was present, or who was still on site at pick-up time.",
    built: [
      "One event, three sports: each sport has its own slots, participants pick one, and waitlists promote the next person automatically when a slot opens.",
      "Signed QR passes: every confirmed participant gets a pass signed with Ed25519 keys, so it can't be forged or edited.",
      "Offline check-in app (PWA): marshals scan passes on their phones even with no signal; scans queue on the device and sync safely when the connection returns.",
      'Check-out and safety: a live "still checked in" list at pick-up time, staff overrides that require a reason, and safeguarding incidents only authorised staff can read.',
      "Role-based access for seven roles — from super admin to guardian and participant — each seeing only what their role allows.",
      "A dashboard with confirmed participants, upcoming sessions, open incidents and attendance trends.",
    ],
    how: [
      "Server-rendered Next.js app, TypeScript end to end, PostgreSQL managed through Prisma migrations.",
      "Own sign-in and session layer with hashed passwords, rate-limited sign-in and email verification.",
      "Security headers (Content Security Policy, HTTPS-only) and a permission policy checked on every action.",
      "3,200+ automated tests — unit, database integration and full browser journeys — run by GitHub Actions on every push; production deploys apply database migrations automatically.",
    ],
    challenges: [
      {
        title: "Two people grabbing the last slot at the same moment",
        body: "Registration locks the event row inside a database transaction, so slots can never be over-booked — proven by a test that fires 50 registrations at 10 slots.",
      },
      {
        title: "Checking players in with no internet",
        body: "The phone keeps a signed copy of the event roster, verifies passes locally, and syncs with idempotent requests so a retried upload never counts a player twice.",
      },
    ],
  },
  {
    slug: "volunteers-portal",
    name: "YSF Volunteers Portal",
    kind: "Mobile app + API · Personal project",
    status: "Open source on GitHub",
    tagline:
      "A cross-platform app that lets volunteers run a sports session from their phone — QR check-in, live headcount and automatically balanced teams.",
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Supabase",
      "pytest",
      "Docker",
    ],
    links: [
      {
        kind: "repo",
        label: "View source on GitHub",
        href: "https://github.com/Sh4nty21/YSF-Basketball-app",
        note: "Flutter app, FastAPI backend and web check-in form",
      },
    ],
    // TODO(confirm): live backend / app download link, if one is public.
    cover: {
      src: "/images/projects/volunteers-portal/live-session.jpg",
      alt: "Live session screen: 41 players checked in, 20 beginner and 21 intermediate, enough for nine 5v5 teams, with a Reshuffle Teams button",
      width: 1170,
      height: 2025,
      frame: "phone",
    },
    gallery: [
      {
        src: "/images/projects/volunteers-portal/sign-in.jpg",
        alt: "Organizer portal sign-in — accounts are appointed by the main fellowship admin",
        width: 1170,
        height: 2010,
        frame: "phone",
      },
      {
        src: "/images/projects/volunteers-portal/sports.jpg",
        alt: "Sport picker: basketball, volleyball and badminton, each with its own team rules",
        width: 1170,
        height: 2010,
        frame: "phone",
      },
      {
        src: "/images/projects/volunteers-portal/live-session.jpg",
        alt: "Live session with player count, skill split and Reshuffle Teams button",
        width: 1170,
        height: 2025,
        frame: "phone",
      },
      {
        src: "/images/projects/volunteers-portal/attendance-stats.jpg",
        alt: "Attendance stats: 41 players, 41 assigned, 0 waiting, 9 teams, and the beginner/intermediate split",
        width: 1170,
        height: 2032,
        frame: "phone",
      },
    ],
    problem:
      "Every Saturday, volunteers had to check in 40+ players and split them into fair teams by hand. It ate into playing time and often produced lopsided games.",
    built: [
      "Organizer portal: accounts are appointed by the main fellowship admin — there is no public sign-up.",
      "Three sports with their own team rules: skill-balanced basketball teams, role-based volleyball teams (2 outside hitters, 2 middle blockers, setter, opposite) and badminton singles or doubles matched within a skill tier.",
      "Live sessions: open or close check-in, show a session QR code that players scan to check in from their own phone's browser, or add players by hand.",
      "Team balancing: players register a skill level and the app splits everyone checked in into balanced teams — for example 41 players into nine 5v5 teams — with one-tap reshuffle.",
      "Attendance stats per session: players, assigned, waiting, teams and the skill split.",
    ],
    how: [
      "Flutter app (Riverpod state management) for organizers; a lightweight HTML/JavaScript check-in form for players.",
      "FastAPI REST backend with SQLAlchemy and Alembic migrations on PostgreSQL hosted by Supabase.",
      "Admin passwords hashed with bcrypt; the first super-admin is created once from environment settings and must change the password on first sign-in.",
      "Automated pytest suites for the API, admin sign-in, multi-sport sessions and each sport's team-balancing logic.",
      "Deployment configs for Render and Railway (Docker).",
    ],
    challenges: [
      {
        title: "Fair teams, three different sports",
        body: "Basketball balances by skill, volleyball fills positions, and badminton pairs within a skill tier — so each sport has its own balancer, each covered by its own tests.",
      },
    ],
  },
  {
    slug: "roadsafe",
    name: "RoadSafe",
    kind: "Edge AI device · Capstone thesis",
    status: "Capstone thesis · Bulacan State University",
    tagline:
      "An Edge AI driver-monitoring device that clips onto a car's rear-view mirror and evaluates driver alertness in real time.",
    stack: ["Raspberry Pi", "Linux", "Computer Vision", "Edge AI", "Git"],
    // No public link (Sean, 2026-10-01: photos only). TODO(confirm): language, CV libraries, alert method, team size.
    links: [],
    cover: {
      src: "/images/projects/roadsafe/mounted-in-car.jpg",
      alt: "The RoadSafe unit clamped to a car's rear-view mirror with its driver-facing camera module",
      width: 1616,
      height: 2026,
      frame: "photo",
    },
    gallery: [
      {
        src: "/images/projects/roadsafe/device.jpg",
        alt: "The RoadSafe unit — black and orange 3D-printed enclosure with the RoadSafe logo",
        width: 1536,
        height: 2048,
        frame: "photo",
      },
      {
        src: "/images/projects/roadsafe/mounted-in-car.jpg",
        alt: "RoadSafe mounted on a car's rear-view mirror",
        width: 1616,
        height: 2026,
        frame: "photo",
      },
    ],
    problem:
      "Driver fatigue and distraction cause many road accidents, and most driver-monitoring systems only come built into expensive new cars.",
    built: [
      "A driver-facing camera unit in a custom 3D-printed enclosure that mounts onto the car's existing rear-view mirror.",
      "Real-time alertness evaluation from several signals: eye aspect ratio (eyes closing), blink analysis, mouth aspect ratio (yawning), head pose (nodding off or looking away) and eye gaze (eyes off the road).",
      "Processing runs on the device itself (edge AI) on a Raspberry Pi, rather than in the cloud.",
    ],
    how: [
      "Raspberry Pi running Linux, with computer-vision analysis of the driver's face.",
      "Version-controlled with Git and tested and validated throughout the development lifecycle.",
    ],
    challenges: [],
    role: "Integrated the Raspberry Pi hardware and carried out testing and validation throughout the development lifecycle.",
  },
  {
    slug: "ysf-website",
    name: "Elevate YSF Website",
    kind: "Full-stack website · Personal project",
    status: "Open source on GitHub",
    tagline:
      "The ministry's public website and member portal — sign-up, role-based dashboards and Saturday pre-check-in with per-sport capacity limits.",
    stack: [
      "Vue 3",
      "Vue Router",
      "JavaScript",
      "PHP",
      "PDO",
      "MySQL / MariaDB",
      "HTML",
      "CSS",
    ],
    links: [
      {
        kind: "repo",
        label: "View source on GitHub",
        href: "https://github.com/Sh4nty21/Elevate-YSF-Website",
        note: "Vue 3 front end, PHP API and MySQL schema",
      },
    ],
    cover: {
      src: "/images/projects/ysf-website/sign-in.jpg",
      alt: "Elevate YSF website sign-in page with 1 Timothy 4:8 beside the login form",
      width: 1440,
      height: 900,
      frame: "browser",
    },
    gallery: [
      {
        src: "/images/projects/ysf-website/sign-in.jpg",
        alt: 'Sign-in page with "Keep me signed in" and a link to sign up',
        width: 1440,
        height: 900,
        frame: "browser",
      },
      {
        src: "/images/projects/ysf-website/sign-up.jpg",
        alt: "Create-account page with full name, username, email, password and conduct agreement",
        width: 1440,
        height: 900,
        frame: "browser",
      },
      {
        src: "/images/projects/ysf-website/session-countdown.jpg",
        alt: "Live countdown banner to the next Saturday session with a Pre-check in button",
        width: 1440,
        height: 175,
        frame: "browser",
      },
      {
        src: "/images/projects/ysf-website/upcoming-events.jpg",
        alt: "Upcoming events section: youth sports camp, class meet and volunteers night",
        width: 1440,
        height: 461,
        frame: "browser",
      },
    ],
    problem:
      "The fellowship needed one place online to introduce the ministry, let members sign up, and know ahead of time how many players to expect for each sport every Saturday.",
    built: [
      "Public landing page with the ministry's mission, programs, upcoming events and gallery.",
      "Sign-up and sign-in, then role-based dashboards for participants, D-Group leaders, sports admins and core admins — each API endpoint checks the signed-in user's role.",
      "Saturday pre-check-in with a capacity per sport (basketball 50, volleyball 36, badminton 36) and a live countdown to the next 1–5 PM session.",
      "Optional email reminders before each session, triggered by a scheduled job.",
    ],
    how: [
      "Vue 3 single-page app with Vue Router (hash routing) loaded from a CDN — no build step, so it runs on any static host.",
      "PHP API using PDO prepared statements on a MySQL / MariaDB database.",
      // Lockout re-enabled in repo commit 6fe7947 (2026-10-01).
      "Security: password hashing, CSRF tokens on every state-changing request, login lockout after 5 failed attempts, session-fixation protection, security headers, and server errors logged instead of shown to visitors.",
    ],
    challenges: [
      {
        title: "Two members taking the last spot at once",
        body: "Pre-check-in locks the sport's row (SELECT … FOR UPDATE) inside a transaction, so capacity can't be exceeded — whoever loses the race gets a clear \"this sport is full\" message.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
