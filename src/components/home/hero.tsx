import { ArrowDown, Download, GraduationCap } from "lucide-react";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button-link";
import { hero } from "@/content/home";
import { profile } from "@/content/profile";

/*
 * Hero entrance runs on plain CSS keyframes (globals.css, "Hero entrance"),
 * not Motion: CSS starts on the first paint, while JS-driven animations keep
 * the hero hidden until the page's JavaScript loads — ~3.7 s on Lighthouse's
 * slow-phone profile. `--d` is each element's delay in seconds.
 */
type Delay = React.CSSProperties & { "--d": string };
const delay = (seconds: number): Delay => ({ "--d": `${seconds}s` });

const WORD_GAP = 0.06;

/** Splits a phrase into words that rise in one after another. */
function Words({
  text,
  start,
  className,
}: {
  text: string;
  start: number;
  className?: string;
}) {
  return text
    .trim()
    .split(/\s+/)
    .map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden pb-[0.08em] align-bottom"
      >
        <span
          className={`hero-rise inline-block ${className ?? ""}`}
          style={delay(start + i * WORD_GAP)}
        >
          {word}
        </span>
        {" "}
      </span>
    ));
}

const iconButton =
  "grid size-11 place-items-center rounded-chip border border-line bg-surface/70 text-fg-muted transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-line-strong hover:text-primary-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Hero() {
  const { before, highlight, after } = hero.headline;
  const beforeCount = before.trim().split(/\s+/).length;
  const highlightCount = highlight.split(/\s+/).length;
  const wordsDone =
    0.25 +
    (beforeCount + highlightCount + after.trim().split(/\s+/).length) *
      WORD_GAP;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Ambient glow (§5.2): only behind the hero, drifts slowly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb-a absolute -top-32 -left-24 size-[28rem] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/25" />
        <div className="orb-b absolute top-1/3 -right-24 size-[24rem] rounded-full bg-accent/10 blur-[120px] dark:bg-accent/15" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-8 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1.25fr_1fr] md:py-16">
        <div>
          <p
            className="hero-fade font-mono text-xs tracking-[0.08em] text-accent-text uppercase"
            style={delay(0.05)}
          >
            {`// ${hero.role}`}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[2.5rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="block text-fg-muted">
              <Words text={hero.greeting} start={0.1} />
            </span>
            <Words text={before} start={0.25} />
            <Words
              text={highlight}
              start={0.25 + beforeCount * WORD_GAP}
              className="text-primary-text"
            />
            <Words
              text={after}
              start={0.25 + (beforeCount + highlightCount) * WORD_GAP}
            />
          </h1>

          {/* Largest text on phones (the LCP element) — fades in early on purpose. */}
          <p
            className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            style={delay(0.2)}
          >
            {hero.intro}
          </p>

          <div className="hero-fade mt-6" style={delay(wordsDone)}>
            <span className="inline-flex items-center gap-2 rounded-chip border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-fg-muted backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {hero.status}
            </span>
          </div>

          <div
            className="hero-fade mt-8 flex flex-wrap items-center gap-3"
            style={delay(wordsDone + 0.1)}
          >
            <Magnetic>
              <ButtonLink href="#projects">
                View projects
                <ArrowDown
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={profile.resume.href}
                download={profile.resume.fileName}
                variant="ghost"
              >
                <Download className="size-4" aria-hidden />
                Download resume
              </ButtonLink>
            </Magnetic>
            <div className="flex gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconButton}
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconButton}
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="hero-photo relative mx-auto w-full max-w-sm md:max-w-none"
          style={delay(0.2)}
        >
          {/* Violet-tinted frame keeps the dark studio backdrop from looking like a hole in light mode (D10). */}
          <div className="relative overflow-hidden rounded-feature border border-line-strong bg-surface-2 p-2 shadow-[0_0_60px_-12px_var(--glow)]">
            <Image
              src={profile.photos.graduation}
              alt="Sean Marcus V. Tomas in his graduation barong and sash"
              width={1328}
              height={1996}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-auto w-full rounded-card"
            />
          </div>
          <div
            className="hero-fade absolute -bottom-4 left-4 flex items-center gap-2 rounded-card border border-line bg-surface/90 px-3 py-2 shadow-lg backdrop-blur-md sm:left-6"
            style={delay(wordsDone + 0.2)}
          >
            <GraduationCap className="size-5 text-primary-text" aria-hidden />
            <div className="leading-tight">
              <p className="text-sm font-semibold">BS Computer Engineering</p>
              <p className="font-mono text-[0.6875rem] text-fg-dim">
                Bulacan State University · 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
