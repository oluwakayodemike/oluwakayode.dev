import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/projects", "/posts/software-without-a-connection"] as const;

const MOBILE = { top: 12, gap: 4 };
const TABLET = { top: 15, gap: 7.5 };
const DESKTOP = { top: 11.25, gap: 5.625 };

async function measureHeader(page: Page) {
  // article pages have a second <header> for the article itself; the site
  // header in shell is always the first one.
  const header = page.locator("header").first();
  const brand = header.locator("a").first();
  const clock = header.locator("p").first();
  const toggle = header.locator("button").first();

  await expect(brand).toBeVisible();
  await expect(clock).toBeVisible();
  await expect(toggle).toBeVisible();

  const headerBox = await header.boundingBox();
  const brandBox = await brand.boundingBox();
  const clockBox = await clock.boundingBox();
  const toggleBox = await toggle.boundingBox();
  if (!headerBox || !brandBox || !clockBox || !toggleBox) {
    throw new Error("Header elements have no layout box");
  }

  return {
    brandTop: brandBox.y,
    brandToClockGap: clockBox.y - (brandBox.y + brandBox.height),
    // optical center of the two-line block (brand top to clock bottom) vs the
    // center of the theme switch.
    blockCenter: (brandBox.y + clockBox.y + clockBox.height) / 2,
    toggleCenter: toggleBox.y + toggleBox.height / 2,
    headerHeight: headerBox.height,
  };
}

function expectedFor(page: Page) {
  const width = page.viewportSize()?.width ?? 0;
  return width < 640 ? MOBILE : width < 768 ? TABLET : DESKTOP;
}

for (const path of PAGES) {
  test.describe(`header spacing on ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
    });

    test("brand sits at the expected distance from the top", async ({ page }) => {
      const m = await measureHeader(page);
      expect(m.brandTop).toBe(expectedFor(page).top);
    });

    test("gap between brand and clock matches the design", async ({ page }) => {
      const m = await measureHeader(page);
      expect(m.brandToClockGap).toBe(expectedFor(page).gap);
    });

    test("theme switch is centered against the brand and clock", async ({ page }) => {
      const m = await measureHeader(page);
      expect(Math.abs(m.toggleCenter - m.blockCenter)).toBeLessThanOrEqual(4);
    });

    test("header does not cause horizontal overflow", async ({ page }) => {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("header spacing is identical across project and article pages", async ({ page }) => {
  const measurements = [] as Array<{
    brandTop: number;
    brandToClockGap: number;
    headerHeight: number;
  }>;
  for (const path of PAGES) {
    await page.goto(path, { waitUntil: "networkidle" });
    const m = await measureHeader(page);
    measurements.push({
      brandTop: m.brandTop,
      brandToClockGap: m.brandToClockGap,
      headerHeight: m.headerHeight,
    });
  }
  const [first, ...rest] = measurements;
  if (!first) throw new Error("No header measurements were collected");
  for (const m of rest) {
    expect(m.brandTop).toBe(first.brandTop);
    expect(m.brandToClockGap).toBe(first.brandToClockGap);
    expect(m.headerHeight).toBe(first.headerHeight);
  }
});
