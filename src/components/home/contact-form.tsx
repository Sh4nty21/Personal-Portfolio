"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useActionState, useRef } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { CONTACT_SUBJECTS, LIMITS, type ContactInput } from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-chip border border-line bg-bg px-3.5 py-2.5 text-fg placeholder:text-fg-dim transition-[border-color,box-shadow] focus:border-primary focus:shadow-[0_0_0_3px_var(--glow)] focus:outline-none aria-[invalid=true]:border-accent";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[0.6875rem] tracking-[0.08em] text-fg-muted uppercase"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}

/** Contact form (§6.1 / step 7) — sends through a server action to Resend. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  // When the visitor first focused a field. The time spent filling the form
  // is sent along (measured here, so server/browser clocks never mix); the
  // server treats a missing or very short time as a bot. Not taken at render
  // time: the page is pre-built, so that would be the build time.
  const startedAt = useRef(0);

  function submit(formData: FormData) {
    const fillMs = startedAt.current ? Date.now() - startedAt.current : 0;
    formData.set("fillMs", String(fillMs));
    formAction(formData);
  }

  const values: Partial<ContactInput> =
    state.status === "invalid" || state.status === "error" ? state.values : {};
  const errors = state.status === "invalid" ? state.errors : {};

  return (
    <div className="relative overflow-hidden rounded-feature border border-line bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "sent" ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <m.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: 0.1,
              }}
              className="grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
            >
              <CheckCircle2 className="size-8" aria-hidden />
            </m.span>
            <h3 className="mt-5 font-display text-2xl font-semibold">
              Message sent — thank you!
            </h3>
            <p className="mt-2 max-w-sm text-fg-muted">
              I&apos;ll reply to the email address you gave, usually within a
              day.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            action={submit}
            onFocusCapture={() => {
              if (!startedAt.current) startedAt.current = Date.now();
            }}
            initial={false}
            exit={{ opacity: 0, y: -8 }}
            noValidate
            className="grid gap-5"
          >
            <div>
              <h3 className="font-display text-xl font-semibold">
                Send a message
              </h3>
              <p className="mt-1 text-sm text-fg-muted">
                Goes straight to my inbox. All fields are required.
              </p>
            </div>

            {/* Spam traps: hidden from people, filled in by bots. */}
            <div
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={LIMITS.name.min}
                  maxLength={LIMITS.name.max}
                  defaultValue={values.name}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                />
              </Field>
              <Field id="email" label="Your email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={LIMITS.email.max}
                  defaultValue={values.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field id="subject" label="Topic" error={errors.subject}>
              <select
                id="subject"
                name="subject"
                required
                defaultValue={values.subject ?? CONTACT_SUBJECTS[0]}
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={inputClass}
              >
                {CONTACT_SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                minLength={LIMITS.message.min}
                maxLength={LIMITS.message.max}
                defaultValue={values.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-y`}
              />
            </Field>

            {state.status === "error" && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-chip border border-accent/40 bg-accent/10 px-3.5 py-2.5 text-sm text-accent-text"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {state.message}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-chip bg-primary-solid px-5 py-3 font-mono text-xs font-semibold tracking-wide text-white uppercase shadow-[0_0_20px_-6px_var(--glow)] transition-[transform,box-shadow,opacity] hover:-translate-y-0.5 hover:shadow-[0_0_28px_-4px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:translate-y-0 disabled:opacity-70"
              >
                {pending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {pending ? "Sending…" : "Send message"}
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
