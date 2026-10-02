import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/*
 * Automated accessibility scan (WCAG 2.x A + AA rules) on every page, in both
 * themes. Content is revealed by scrolling first, because scroll animations
 * start hidden and axe can't judge contrast on invisible text.
 */
const pages = [
  "/",
  "/projects/project-ysf",
  "/projects/volunteers-portal",
  "/projects/roadsafe",
  "/projects/ysf-website",
];

for (const scheme of ["light", "dark"] as const) {
  for (const path of pages) {
    test(`${path} has no WCAG A/AA violations (${scheme})`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto(path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.nodes.length}× — ${v.nodes[0]?.target.join(" ")}`,
      );
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }
}
