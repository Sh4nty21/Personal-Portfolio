/*
 * Extra case-study content: architecture layers and,
 * for public repos only, a short real code excerpt from the linked repository
 * (trimmed for length; removed lines are marked with "…"). Project YSF's source is private (D12), so no snippet.
 */

export type ArchitectureLayer = { name: string; detail: string };

export type CodeSnippet = {
  title: string;
  language: string;
  /** Path inside the repo, shown above the code. */
  file: string;
  href: string;
  code: string;
};

export type CaseStudyExtras = {
  architecture: ArchitectureLayer[];
  snippet?: CodeSnippet;
};

export const caseStudyExtras: Record<string, CaseStudyExtras> = {
  "project-ysf": {
    architecture: [
      {
        name: "Phones & browsers",
        detail:
          "Staff dashboard, guardian sign-up, and an offline-capable check-in PWA that queues scans in IndexedDB.",
      },
      {
        name: "Next.js server",
        detail:
          "Server-rendered pages, server actions and a versioned JSON API for check-in bundles and sync.",
      },
      {
        name: "Services & permission policy",
        detail:
          "Every action goes through one policy check; Ed25519-signed passes; idempotent sync and conflict handling.",
      },
      {
        name: "PostgreSQL",
        detail:
          "Prisma migrations, row locks for slots, and database constraints that back up the app rules.",
      },
    ],
  },
  "volunteers-portal": {
    architecture: [
      {
        name: "Flutter app + web check-in form",
        detail:
          "Organizers run sessions in the app; players scan the session QR and check in from their own phone's browser.",
      },
      {
        name: "FastAPI REST API",
        detail:
          "Routers for sessions, attendees, teams and admin sign-in, with bcrypt-hashed admin passwords.",
      },
      {
        name: "Team balancers",
        detail:
          "Pure functions — one per sport — with no database or HTTP code, so each is tested on its own with pytest.",
      },
      {
        name: "PostgreSQL on Supabase",
        detail: "SQLAlchemy models and Alembic migrations.",
      },
    ],
    snippet: {
      title: "Snake draft that spreads skill levels evenly across teams",
      language: "Python",
      file: "ysf-basketball-api/app/services/team_balancer.py",
      href: "https://github.com/Sh4nty21/YSF-Basketball-app/blob/main/ysf-basketball-api/app/services/team_balancer.py",
      code: `def snake_draft(queue: Sequence[Player], num_teams: int) -> list[list[Player]]:
    """Deal an already-ordered queue across \`\`num_teams\`\` in snake order.

    Round 0 runs left-to-right (Team A, B, C...), round 1 runs right-to-left
    (C, B, A), and so on.
    """
    if num_teams < 1:
        raise BalancingError("num_teams must be at least 1")

    teams: list[list[Player]] = [[] for _ in range(num_teams)]
    for position, player in enumerate(queue):
        round_index, slot = divmod(position, num_teams)
        target = slot if round_index % 2 == 0 else num_teams - 1 - slot
        teams[target].append(player)
    return teams`,
    },
  },
  roadsafe: {
    architecture: [
      {
        name: "Driver-facing camera",
        detail:
          "Mounted on the rear-view mirror in a custom 3D-printed enclosure.",
      },
      {
        name: "Raspberry Pi (edge AI)",
        detail:
          "Computer-vision analysis of the driver's face: eye aspect ratio, blinks, mouth aspect ratio, head pose and eye gaze.",
      },
      {
        name: "Alertness evaluation",
        detail:
          "The signals are combined in real time to judge whether the driver is drowsy or distracted.",
      },
      {
        name: "Intervention",
        detail: "The system alerts the driver when alertness drops.",
      },
    ],
  },
  "ysf-website": {
    architecture: [
      {
        name: "Vue 3 single-page app",
        detail:
          "Hash-based routing, loaded from a CDN with no build step — runs on any static host.",
      },
      {
        name: "PHP API",
        detail:
          "Sessions with CSRF tokens, role checks per endpoint, login lockout, and PDO prepared statements.",
      },
      {
        name: "MySQL / MariaDB",
        detail:
          "Users, roles, D-Groups, sports with per-Saturday capacity, attendance and pre-check-ins.",
      },
    ],
    snippet: {
      title: "Locking the sport's row so two members can't take the last spot",
      language: "PHP",
      file: "YSF-Website/backend/pre_checkin.php",
      href: "https://github.com/Sh4nty21/Elevate-YSF-Website/blob/main/Elevate-YSF-Website/YSF-Website/backend/pre_checkin.php",
      code: `$pdo->beginTransaction();

// Lock this sport's row so concurrent check-ins for the same sport
// are processed one at a time until the transaction commits.
$stmt = $pdo->prepare('SELECT sport_id, sport_name, capacity FROM sports WHERE sport_id = :id FOR UPDATE');
$stmt->execute(['id' => $sportId]);
$sport = $stmt->fetch();

// … ("sport exists" and "already checked in" checks omitted)

$stmt = $pdo->prepare(
    "SELECT COUNT(*) AS total FROM pre_checkins
     WHERE sport_id = :sid AND session_date = :date AND status = 'confirmed'"
);
$stmt->execute(['sid' => $sportId, 'date' => $sessionDate]);
$count = (int)$stmt->fetch()['total'];

if ($count >= (int)$sport['capacity']) {
    $pdo->rollBack();
    // This is the required "sport is full" alert.
    sendResponse(false, "Sorry, {$sport['sport_name']} is already full for this Saturday ...", ['full' => true], 409);
}`,
    },
  },
};
