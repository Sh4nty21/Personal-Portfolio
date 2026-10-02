# Sean Marcus V. Tomas — Portfolio

Personal portfolio of Sean Marcus V. Tomas, Computer Engineer and full-stack / mobile developer: an animated, light/dark home page and a case study for each project, each linking to its live demo or source code.

**Stack:** Next.js 16 (App Router, static pages) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · React View Transitions · next-themes · Resend (contact form) · Playwright + axe · GitHub Actions · Vercel

## Run locally

Requires Node 22 and pnpm 9.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. To make the contact form send email locally, copy `.env.example` to `.env.local` and fill it in.

## Scripts

| Command         | What it does                                                                     |
| --------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`      | Start the dev server                                                             |
| `pnpm build`    | Production build (all pages pre-rendered)                                        |
| `pnpm verify`   | Lint, type-check, formatting check and unit tests                                |
| `pnpm test`     | Unit tests (Node's built-in test runner)                                         |
| `pnpm test:e2e` | Playwright smoke + axe accessibility tests on the build (run `pnpm build` first) |
| `pnpm format`   | Format all files with Prettier                                                   |

## Environment variables

| Name                   | Purpose                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key for the contact form                                                               |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact-form messages                                                         |
| `CONTACT_FROM_EMAIL`   | Optional sender (defaults to Resend's `onboarding@resend.dev`)                                    |
| `NEXT_PUBLIC_SITE_URL` | Optional public URL for link previews and the sitemap (Vercel's production URL is used otherwise) |

## Project structure

- `src/app/` — pages (home, `projects/[slug]` case studies, 404), contact server action, SEO files
- `src/components/` — layout, home sections, case-study parts and reusable motion wrappers
- `src/content/` — all site content as typed data files (projects, skills, experience, certifications)
- `tests/` — unit tests and Playwright end-to-end + accessibility tests
