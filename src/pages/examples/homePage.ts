import {
  type Locator,
  type Page,
  expect,
  BrowserContext,
} from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly getStartedButton: Locator;
  readonly pageTitle: RegExp;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.getStartedButton = page.getByRole("link", { name: "Get started" });
    this.pageTitle = /Playwright/;
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  async assertPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }
}

export default HomePage;
