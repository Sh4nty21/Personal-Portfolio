import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("shows every section and real proof links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Hi, I'm Sean.",
    );
    for (const id of [
      "about",
      "projects",
      "skills",
      "experience",
      "certifications",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    // D21: each project's proof is a real external link.
    const links = page.locator("#projects a[target=_blank]");
    await expect(links).toHaveCount(3);
    await expect(links.nth(0)).toHaveAttribute(
      "href",
      "https://project-ysf.vercel.app",
    );
    await expect(page.locator("#projects")).toContainText("Hardware project");
  });

  test("resume is downloadable", async ({ page, request }) => {
    await page.goto("/");
    const href = await page
      .getByRole("link", { name: /Download resume/i })
      .getAttribute("href");
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("theme toggle switches between light and dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test("skill filter highlights a project's skills", async ({ page }) => {
    await page.goto("/#skills");
    const button = page.getByRole("button", { name: "RoadSafe", exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("case studies", () => {
  test("open from a card and link back home", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: "Read the Project YSF case study" })
      .click();
    await expect(page).toHaveURL(/\/projects\/project-ysf$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Project YSF",
    );
    await expect(
      page.getByRole("link", { name: /Open live demo/ }),
    ).toBeVisible();
    await page.getByRole("link", { name: "All projects" }).click();
    await expect(page).toHaveURL(/\/#projects$/);
  });

  test("every project page exists; unknown ones 404", async ({ request }) => {
    for (const slug of [
      "project-ysf",
      "volunteers-portal",
      "roadsafe",
      "ysf-website",
    ]) {
      expect((await request.get(`/projects/${slug}`)).status(), slug).toBe(200);
    }
    expect((await request.get("/projects/not-a-project")).status()).toBe(404);
  });
});

test.describe("contact form", () => {
  test("explains what's missing instead of sending", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByLabel("Your name").focus();
    // Wait past the anti-bot minimum fill time.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please write at least 20 characters."),
    ).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("serves sitemap, robots and a link-preview image", async ({
    request,
  }) => {
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const og = await request.get("/opengraph-image");
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
  });
});
