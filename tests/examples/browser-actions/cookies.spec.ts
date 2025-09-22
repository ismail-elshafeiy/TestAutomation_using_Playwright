import { test, expect, BrowserContext } from "@playwright/test";
import { allure } from "allure-playwright";

test.describe("Test Cookies", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("test case #1 - Get All Cookies ", async ({ page, context }) => {
    (await context.cookies()).forEach((cookie) => {
      console.log(cookie);
      console.log(context.cookies().then.length);
    });
  });
  test("test case #2 - Delete Cookies", async ({ page, context }) => {
    await context.clearCookies();
    (await context.cookies()).forEach((element) => {
      console.log(element);
    });
  });
});
