import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

/** Screenshot inside a browser bar, a phone outline, or a plain photo crop. */
export function ProjectMedia({
  image,
  sizes,
}: {
  image: ProjectImage;
  sizes: string;
}) {
  if (image.frame === "phone") {
    return (
      <div className="relative flex aspect-[16/10] items-end justify-center overflow-hidden bg-linear-to-br from-surface-2 via-surface to-surface-2 pt-6">
        <div className="w-[34%] translate-y-[18%] overflow-hidden rounded-[1.4rem] border-[5px] border-fg/85 bg-fg/85 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.45)] transition-transform duration-500 group-hover:translate-y-[12%]">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 16vw, 34vw"
            className="h-auto w-full rounded-[1rem]"
          />
        </div>
      </div>
    );
  }

  if (image.frame === "photo") {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 p-4 pb-0 sm:p-6 sm:pb-0">
      <div className="h-full overflow-hidden rounded-t-card border border-b-0 border-line shadow-[0_20px_40px_-16px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover:-translate-y-1">
        <div
          className="flex h-6 items-center gap-1.5 border-b border-line bg-surface px-3"
          aria-hidden
        >
          <span className="size-2 rounded-full bg-fg-dim/40" />
          <span className="size-2 rounded-full bg-fg-dim/40" />
          <span className="size-2 rounded-full bg-fg-dim/40" />
        </div>
        <div className="relative h-[calc(100%-1.5rem)] bg-white">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
