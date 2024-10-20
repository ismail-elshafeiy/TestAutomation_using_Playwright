import {
  getDataByIndex,
  getSheet,
  getDataByName,
  loadExcelData,
  writeDataIntoCellByIndex,
  writeDataIntoCellByName,
} from "@lib/ExcelFileManager";
import { test, expect } from "@playwright/test";
import { get } from "http";

test.describe("Example to demonstrate read data from excel in Playwright", () => {
  let filePath = "tests/data/LoginData.xlsx";
  let sheetName = "login Data2";
  loadExcelData(filePath, sheetName);
  test("Read data from excel by index", async ({ page }) => {
    // let filePath = "tests/data/LoginData.xlsx";
    // await loadExcelData(filePath, "login Data2");
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.fill("#username", await getDataByIndex(2, 2));
    await page.fill("#password", await getDataByIndex(2, 3));
    await page.click("button[type='submit']");
    await expect(page.locator(".flash.success")).toBeVisible();
    await writeDataIntoCellByIndex(2, 5, "Passed");
    // await expect(page.locator(`xpath=//div[@id="flash"]`)).toHaveText(await getDataFromExcel(filePath, "login Data", 2, 3));
    await expect(page.locator(".example h2")).toHaveText("Secure Area");
    await expect(page.locator(".example h4")).toHaveText("Welcome to the Secure Area. When you are done click logout below.");
  });

  test("Read data from excel by name", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.fill("#username", await getDataByName("email3", "email"));
    await page.fill("#password", await getDataByName("email3", "password"));
    await page.click("button[type='submit']");
    await expect(page.locator(".flash.success")).toBeVisible();
    await writeDataIntoCellByName("email3", "Login Successful", "Failed");
    // await expect(page.locator(`xpath=//div[@id="flash"]`)).toHaveText(await getDataFromExcel(filePath, "login Data", 2, 3));
    await expect(page.locator(".example h2")).toHaveText("Secure Area");
    await expect(page.locator(".example h4")).toHaveText("Welcome to the Secure Area. When you are done click logout below.");
  });
});
