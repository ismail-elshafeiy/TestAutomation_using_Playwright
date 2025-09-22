import { test, expect } from "@playwright/test";
// https://playwright.dev/docs/api/class-mouse
test.describe("Example to demonstrate execution mouse methods in Playwright",{ tag: '@examples' }, () => {
  test("Working with mouse", async ({ page }) => {
    await page.goto("https://paint.js.org/");
    // drawing a square
    await page.mouse.move(200, 200);
    await page.mouse.down();
    await page.mouse.move(400, 200);
    await page.mouse.move(400, 400);
    await page.mouse.move(200, 400);
    await page.mouse.move(200, 200);
    await page.mouse.up();
  });
});
