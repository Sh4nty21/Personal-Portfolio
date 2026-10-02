import { Reveal } from "@/components/motion/reveal";

type SectionProps = {
  id: string;
  /** Small mono label above the title, e.g. "Selected work". */
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** A home-page section: anchor target + animated heading block (§6.1, §7). */
export function Section({
  id,
  label,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase">
            {`// ${label}`}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-3xl leading-tight font-bold tracking-[-0.025em] md:text-[2.5rem]"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
