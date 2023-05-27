import { chromium, expect } from "@playwright/test"
/**
 * https://playwright.dev/docs/test-auth
 */

async function globalConfig() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://qacart-todo.herokuapp.com/login");
    const emailField = page.locator('//input[@name="email"]');
    const passwordField = page.locator('//input[@name="password"]');
    const submitButton = page.locator('button:has-text("Login")');
    await emailField.fill('ismail.elshafeiy@gmail.com');
    await passwordField.fill('Som3a@1993');
    submitButton.click();
    // await expect(page).toHaveTitle('QAcart Todo App - Todos page');
    await page.context().storageState({
        path: 'storageState.json',
    });

}
export default globalConfig;