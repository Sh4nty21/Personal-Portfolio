import { ExternalLink } from "lucide-react";
import type { CodeSnippet } from "@/content/case-studies";

/** A real excerpt from the project's public repo, with a link to the full file. */
export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  return (
    <figure className="overflow-hidden rounded-card border border-line bg-[#0d0d14]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span aria-hidden className="flex gap-1">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
          </span>
          {snippet.file}
        </span>
        <a
          href={snippet.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-violet-300 hover:text-violet-200 focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          View full file
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed text-slate-200">
        <code className="font-mono">{snippet.code}</code>
      </pre>
    </figure>
  );
}
