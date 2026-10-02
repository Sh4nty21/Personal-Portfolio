"use server";

import { headers } from "next/headers";
import {
  createRateLimiter,
  formatContactEmail,
  LIMITS,
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: ContactInput }
  | { status: "sent" }
  | { status: "error"; message: string; values: ContactInput };

const allowSend = createRateLimiter(3, 10 * 60 * 1000);

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Sends the contact form to Sean's inbox through Resend (D13). The recipient
 * and API key come from server environment variables, never from the page.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactInput = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  // Bots: fill the hidden "website" field, or submit instantly. Pretend it
  // worked so they don't learn anything, but send nothing.
  const fillMs = Number(text(formData, "fillMs"));
  const tooFast = !Number.isFinite(fillMs) || fillMs < LIMITS.minFillMs;
  if (text(formData, "website") !== "" || tooFast) {
    return { status: "sent" };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowSend(ip)) {
    return {
      status: "error",
      message:
        "You've sent a few messages already. Please try again in a few minutes, or email me directly.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return {
      status: "error",
      message:
        "The contact form isn't set up yet. Please use the email address instead.",
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "Portfolio contact <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email.trim(),
        subject: `[Portfolio] ${values.subject} — ${values.name.trim()}`,
        text: formatContactEmail(values),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(
        "[contact] Resend responded",
        response.status,
        await response.text(),
      );
      throw new Error(`Resend ${response.status}`);
    }
  } catch (error) {
    console.error("[contact] send failed", error);
    return {
      status: "error",
      message:
        "Your message couldn't be sent right now. Please try again, or email me directly.",
      values,
    };
  }

  return { status: "sent" };
}
