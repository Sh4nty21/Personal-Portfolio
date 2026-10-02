"use client";

import { m } from "motion/react";
import type { ArchitectureLayer } from "@/content/case-studies";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Layer-by-layer architecture (§6.2): each layer slides in one after another,
 * and a pulse travels down the connector to the next layer.
 */
export function Architecture({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <ol
      className="relative"
      aria-label="Architecture, from the user down to the data"
    >
      {layers.map((layer, i) => (
        <li key={layer.name} className="relative">
          <m.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.12 }}
            className="relative flex gap-4 rounded-card border border-line bg-surface p-5"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-chip border border-line-strong bg-surface-2 font-mono text-xs text-primary-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-display font-semibold">{layer.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                {layer.detail}
              </p>
            </div>
          </m.div>

          {i < layers.length - 1 && (
            <div
              aria-hidden
              className="relative ml-[2.05rem] h-8 w-px overflow-hidden"
            >
              <span className="absolute inset-0 bg-line-strong" />
              <span className="absolute inset-x-0 h-3 animate-[pulse-down_2.4s_ease-in-out_infinite] bg-linear-to-b from-transparent via-primary to-transparent motion-reduce:hidden" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
