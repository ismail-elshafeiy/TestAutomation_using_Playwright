import { test, Page } from '@playwright/test';
import { allure } from "allure-playwright";


export class BaseTest {
    readonly url = '/';
    page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async navigateToHomePage() {
        await this.page.goto(this.url);
    }
}