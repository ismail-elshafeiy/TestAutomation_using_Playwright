import { test, expect } from "@playwright/test";
// https://playwright.dev/docs/api/class-keyboard
test.describe("Example to demonstrate execution keyboard methods in Playwright", { tag: '@examples' },() => {
  test("Working with keyboard", async ({ page }) => {
    // navigating to site
    await page.goto("https://the-internet.herokuapp.com/key_presses");
    await page.click("input");
    await page.keyboard.type("Hello Bro, check my actions");
    await page.keyboard.down("Shift");
    for (let i = 0; i < " my actions".length; i++) {
      await page.keyboard.press("ArrowLeft");
    }
    await page.keyboard.up("Shift");
    await page.keyboard.press("Backspace");
    await page.keyboard.type(" ,ok did u like it ;)");
  });
});
