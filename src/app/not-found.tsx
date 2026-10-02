import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] w-full max-w-6xl items-center px-4 py-20 sm:px-8">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.08em] text-accent-text uppercase">
          {"// 404"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-lg text-fg-muted">
          The link may be old or mistyped. Everything on this site starts from
          the home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-chip bg-primary-solid px-5 py-3 font-mono text-xs font-semibold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </Link>
      </Reveal>
    </div>
  );
}
