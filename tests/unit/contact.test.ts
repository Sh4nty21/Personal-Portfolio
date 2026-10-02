import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONTACT_SUBJECTS,
  createRateLimiter,
  formatContactEmail,
  validateContact,
  type ContactInput,
} from "../../src/lib/contact.ts";

const valid: ContactInput = {
  name: "Maria Santos",
  email: "maria@example.com",
  subject: CONTACT_SUBJECTS[0],
  message:
    "Hi Sean, we have a junior developer opening and would like to talk.",
};

describe("validateContact", () => {
  it("accepts a complete, sensible message", () => {
    assert.deepEqual(validateContact(valid), {});
  });

  it("rejects a missing name, bad email, unknown topic and short message", () => {
    const errors = validateContact({
      name: " ",
      email: "not-an-email",
      subject: "Buy crypto",
      message: "hi",
    });
    assert.deepEqual(Object.keys(errors).sort(), [
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  it("ignores surrounding spaces when measuring length", () => {
    const errors = validateContact({ ...valid, message: "   too short      " });
    assert.ok(errors.message);
  });

  it("rejects overly long input", () => {
    const errors = validateContact({
      ...valid,
      name: "x".repeat(81),
      message: "y".repeat(2001),
    });
    assert.ok(errors.name);
    assert.ok(errors.message);
  });
});

describe("formatContactEmail", () => {
  it("produces plain text containing every field", () => {
    const body = formatContactEmail({
      ...valid,
      message: "<b>hello</b> there, this is long enough",
    });
    assert.match(body, /Maria Santos/);
    assert.match(body, /maria@example\.com/);
    assert.match(body, /Job opportunity/);
    // Markup is passed through as literal text — the email is sent as text, not HTML.
    assert.match(body, /<b>hello<\/b>/);
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit per key within the window, then blocks", () => {
    const allow = createRateLimiter(2, 1000);
    assert.equal(allow("1.2.3.4", 0), true);
    assert.equal(allow("1.2.3.4", 100), true);
    assert.equal(allow("1.2.3.4", 200), false);
    assert.equal(allow("5.6.7.8", 200), true, "other visitors are unaffected");
  });

  it("allows again once old hits leave the window", () => {
    const allow = createRateLimiter(1, 1000);
    assert.equal(allow("ip", 0), true);
    assert.equal(allow("ip", 999), false);
    assert.equal(allow("ip", 1001), true);
  });
});
