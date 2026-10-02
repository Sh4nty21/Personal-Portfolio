"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { ProjectImage } from "@/content/projects";

/** Screenshot grid; click opens a native <dialog> viewer with prev/next. */
export function Gallery({
  images,
  name,
}: {
  images: ProjectImage[];
  name: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = images[index];

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  const isPhone = (img: ProjectImage) => img.frame === "phone";

  return (
    <>
      <Stagger
        as="ul"
        className={`grid gap-4 ${images.every(isPhone) ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2"}`}
      >
        {images.map((img, i) => (
          <StaggerItem as="li" key={`${img.src}-${i}`}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`View larger: ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-card border border-line bg-surface-2 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes={
                  isPhone(img)
                    ? "(min-width: 640px) 25vw, 50vw"
                    : "(min-width: 640px) 50vw, 100vw"
                }
                className="h-auto w-full"
              />
              <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-chip bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-4" aria-hidden />
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <dialog
        ref={dialogRef}
        aria-label={`${name} screenshots`}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92svh] w-[min(94vw,1100px)] overflow-hidden rounded-feature border border-line-strong bg-surface p-0 text-fg backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-[cert-in_250ms_ease-out]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
          <p className="text-sm text-fg-muted">
            <span className="font-mono text-fg-dim">
              {index + 1} / {images.length}
            </span>{" "}
            {current.alt}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-chip border border-line text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="relative flex items-center justify-center bg-surface-2 p-3">
          <Image
            key={current.src + index}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1100px) 1100px, 94vw"
            className="h-auto max-h-[78svh] w-auto max-w-full rounded-chip"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
