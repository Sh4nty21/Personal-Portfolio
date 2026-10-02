/**
 * Contact form rules, shared by the form (field limits) and the server action
 * (validation). Pure functions only, so they're easy to test.
 */

export const CONTACT_SUBJECTS = [
  "Job opportunity",
  "Freelance project",
  "Question about my work",
  "Something else",
] as const;

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 20, max: 2000 },
  /** Filling the form faster than this (from first focus) looks like a bot. */
  minFillMs: 3000,
} as const;

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

// Deliberately simple: something@something.tld, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name.max)
    errors.name = `Please keep your name under ${LIMITS.name.max} characters.`;

  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email.max)
    errors.email = "Please enter a valid email address so I can reply.";

  if (!(CONTACT_SUBJECTS as readonly string[]).includes(input.subject))
    errors.subject = "Please choose a topic.";

  if (message.length < LIMITS.message.min)
    errors.message = `Please write at least ${LIMITS.message.min} characters.`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  return errors;
}

/** Plain-text email body (never HTML, so nothing a visitor types can inject markup). */
export function formatContactEmail(input: ContactInput): string {
  return [
    `New message from your portfolio contact form`,
    ``,
    `Name:    ${input.name.trim()}`,
    `Email:   ${input.email.trim()}`,
    `Topic:   ${input.subject}`,
    ``,
    input.message.trim(),
    ``,
    `— Reply to this email to answer ${input.name.trim()} directly.`,
  ].join("\n");
}

/**
 * Best-effort per-IP limit: at most `max` sends per `windowMs`. In-memory, so
 * it resets when a serverless instance restarts — the honeypot and timing
 * checks are the main spam defence; this stops simple repeat-submit floods.
 */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function allow(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    return true;
  };
}
