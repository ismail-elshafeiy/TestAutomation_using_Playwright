import { test, expect } from "@playwright/test";
import { User } from "./data";
import fs from "fs";
import { parse } from "csv-parse/sync";
test.describe("Example to demonstrate read data from csv file in Playwright", () => {
  const userData: User[] = parse(fs.readFileSync("tests/data/loginDataCSV.csv"), {
    columns: true,
    skip_empty_lines: true,
    
  });
  /**
   * for...of: Works with async/await seamlessly.
   * Each iteration will wait for the previous one to complete
   * making it ideal for situations where you need to wait for the result of an asynchronous operation before proceeding to the next iteration.
   */
  let numberOfRecords = userData.length;
  for (const record of userData) {
    if (record.run.toLowerCase().trim() === "yes") {
      test(`Read data from csv file 1 - ${userData.indexOf(record) + 1}/${numberOfRecords}`, async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await page.fill("#username", record.email);
        await page.fill("#password", record.password);
        await page.click("button[type='submit']");
        await expect(page.locator(".flash.success")).toBeVisible();
        await expect(page.locator(".example h2")).toHaveText("Secure Area");
        await expect(page.locator(".example h4")).toHaveText("Welcome to the Secure Area. When you are done click logout below.");
      });
    }
  }
  /**
   * forEach: It is a synchronous operation, meaning that the next iteration will not wait for the previous one to complete.
   * This makes it ideal for situations where you need to perform an operation on each item in an array independently of the others.
   */
  userData.forEach((record: User) => {
    if (record.run.toLowerCase().trim() === "yes") {
      test(`Read data from csv file 2 - ${userData.indexOf(record) + 1}/${numberOfRecords}`, async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await page.fill("#username", record.email);
        await page.fill("#password", record.password);
        await page.click("button[type='submit']");
        await expect(page.locator(".flash.success")).toBeVisible();
        await expect(page.locator(".example h2")).toHaveText("Secure Area");
        await expect(page.locator(".example h4")).toHaveText("Welcome to the Secure Area. When you are done click logout below.");
      });
    }
  });
});
