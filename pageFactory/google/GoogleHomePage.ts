import { Locator, Page, BrowserContext, expect } from '@playwright/test';

export class GoogleHomePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly url = 'https://www.google.com/ncr';
  readonly googleLogoImage: Locator;
  readonly searchBar: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.googleLogoImage = page.locator('img[alt="Google"]');
    this.searchBar = page.locator('input[name="q"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async expectGoogleLogoToBeDisplayed(): Promise<void> {
    await expect(this.googleLogoImage).toHaveScreenshot();
  }

  async expectPageTitleToBeCorrect(): Promise<void> {
    await expect(this.page).toHaveTitle('Google');

  }

  async searchFor(query: string): Promise<void> {
    await this.searchBar.type(query);
    await this.searchBar.press('Enter');
  }
}