import test, { expect } from "@playwright/test";

/**
 * https://playwright.dev/docs/locators
 *
 */
test.describe("To do test", () => {
  test.use({
    storageState: "storageState.json",
  });
  test("Find element by text", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/");
    // in case i want to use text case sensitve
    // should i add the text between "" to be like 'text="Login to Application"'
    const header = page.locator("text=Login to Application");
    await expect(header).toBeVisible();
  });

  test("Find element by class", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/");
    const header = page.locator(".header");
    await expect(header).toHaveText("Login to Application");
  });

  test("Find element by id", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/login");
    const emailField = page.locator("#email");
    const passwordField = page.locator("#password");
    await emailField.fill("ismail.elshafeiy@gmail.com");
    await passwordField.fill("Som3a@1993");
    page.locator("text=Login").click();
  });

  test("Find element by Attribute", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/login");
    // just add attribute and value
    const emailField = page.locator('[name="email"]');
    const passwordField = page.locator('[name="password"]');
    await emailField.fill("ismail.elshafeiy@gmail.com");
    await passwordField.fill("Som3a@1993");
  });

  test("Find element by xpath", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/login");
    // syntax ->  //tagName[@attribute="value"]
    const emailField = page.locator('//input[@name="email"]');
    const passwordField = page.locator('//input[@name="password"]');
    await emailField.fill("ismail.elshafeiy@gmail.com");
    await passwordField.fill("Som3a@1993");
  });

  test("Find element by combine text and tagName", async ({ page }) => {
    await page.goto("https://qacart-todo.herokuapp.com/login");
    // syntax ->  //tagName[@attribute="value"]
    const emailField = page.locator('//input[@name="email"]');
    const passwordField = page.locator('//input[@name="password"]');
    const submitButton = page.locator('button:has-text("Login")');
    await emailField.fill("ismail.elshafeiy@gmail.com");
    await passwordField.fill("Som3a@1993");
    submitButton.click();
  });
});
