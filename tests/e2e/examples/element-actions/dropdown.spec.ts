import { test, expect } from "@playwright/test";
// https://playwright.dev/docs/input#select-options
test.describe("Example to demonstrate execution dropdown methods in Playwright", () => {
  test("Working with dropdown", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropdown = await page.$("#dropdown");
    // by value
    await dropdown.selectOption({ value: "1" });
    // by label
    await dropdown.selectOption({ label: "Option 2" });
    // by index
    await dropdown.selectOption({ index: 1 });
    // values inside this select
    const availableOptions = await dropdown.$$("option");
    for (const element of availableOptions) {
      console.log(await element.innerText());
    }
  });
});
