"use client";

import { BadgeCheck, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { certifications, type Certification } from "@/content/certifications";

export function Certifications() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Certification | null>(null);

  function show(cert: Certification) {
    setOpen(cert);
    dialogRef.current?.showModal();
  }

  return (
    <Section
      id="certifications"
      label="Certifications"
      title="Industry certifications."
      intro="Earned during my internship at Nimbus Technologies. Where the issuer provides a credential ID, it is listed so the certificate can be checked."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {certifications.map((cert) => (
          <StaggerItem key={cert.title} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_40px_-16px_var(--glow)]">
              <button
                type="button"
                onClick={() => show(cert)}
                className="relative block aspect-[4/3] overflow-hidden bg-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                aria-label={`View certificate: ${cert.title}`}
              >
                <Image
                  src={cert.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-chip bg-black/60 text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                  <Maximize2 className="size-4" aria-hidden />
                </span>
              </button>
              <div className="flex flex-1 flex-col border-t border-line p-5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-primary-text uppercase">
                  <BadgeCheck className="size-3.5" aria-hidden />
                  {cert.issuer}
                </p>
                <h3 className="mt-2 font-display text-lg leading-snug font-semibold">
                  {cert.title}
                </h3>
                <dl className="mt-auto space-y-1 pt-4 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-fg-dim">Issued</dt>
                    <dd className="text-fg-muted">
                      {cert.issued}
                      {cert.validUntil && ` · valid until ${cert.validUntil}`}
                    </dd>
                  </div>
                  {cert.credentialId && (
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="text-fg-dim">Credential ID</dt>
                      <dd className="font-mono text-xs leading-5 break-all text-fg">
                        {cert.credentialId}
                      </dd>
                    </div>
                  )}
                  {cert.verifyAt && (
                    <div className="flex gap-2">
                      <dt className="text-fg-dim">Verify at</dt>
                      <dd className="text-fg-muted">{cert.verifyAt}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Native <dialog>: focus trap, Esc to close and backdrop come built in. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label={open ? `Certificate: ${open.title}` : "Certificate"}
        className="m-auto w-[min(92vw,960px)] rounded-feature border border-line-strong bg-surface p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[cert-in_250ms_ease-out]"
      >
        {open && (
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
              <p className="font-display font-semibold">{open.title}</p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-chip border border-line text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="bg-white p-3">
              <Image
                src={open.image.src}
                alt={`Certificate: ${open.title}, issued by ${open.issuer} to Sean Marcus V. Tomas`}
                width={open.image.width}
                height={open.image.height}
                sizes="(min-width: 1024px) 960px, 92vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        )}
      </dialog>
    </Section>
  );
}
