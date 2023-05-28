import { BrowserContext, expect, Locator, Page } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly resultStatsLabel: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;

    this.resultStatsLabel = page.locator('div#result-stats');
  }

  async expectResultStatsToBeNotEmpty() {
    await expect(this.resultStatsLabel).not.toHaveText('');
  }
}