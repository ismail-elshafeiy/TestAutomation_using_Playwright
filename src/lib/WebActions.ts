import { Locator, Page, expect, BrowserContext } from '@playwright/test';
import * as CryptoJS from 'crypto-js';


export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context?: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async clickOnElement(locator: Locator) {
        await locator.click();
    }
    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async fillInput(locator: Locator, InputValue: string) {
        console.log(`Fill ${InputValue}`);
        await locator.fill(InputValue);
    }

    async hoverOnLocator(locator: Locator) {
        await locator.hover({ timeout: 5000 });
    }

    async validateElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async validateCountOfElements(locator: Locator, expectedCount: number) {
        await expect(locator).toHaveCount(expectedCount);
    }

    async validateCountOfElementsIsNotZero(locator: Locator) {
        const count = await locator.count();
        await expect(count).toBeGreaterThanOrEqual(1);
    }

    async validateElementNotVisible(locator: Locator) {
        await expect(locator).not.toBeVisible();
    }
    async validateText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);

    }

    async validateContainsText(locator: Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }

    async waitForElementToBeVisible(locator: string) {
        await this.page.waitForSelector(locator, {
            state: 'visible'
        });

    }

    async waitForLocator(locator: Locator) {
        await locator.waitFor({
            state: 'visible'
        })
    };
    async waitforElement(timeout: number) {
        await this.page.waitForTimeout(timeout);

    }

    async encrypt(text:string) {
        const key = `SECRET`;
        console.log(`The text is ${text}`);
        const cipher = CryptoJS.AES.encrypt('************', key);
         console.log(cipher.toString());
        return CryptoJS.AES.decrypt(text,key).toString(CryptoJS.enc.Utf8);

    }

    async decrypt(text:string) {
        const key = `SECRET`;
        const cipher = CryptoJS.AES.encrypt(text, key);
        console.log(cipher.toString());
        return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    }

    async returnNumberOfItems(inputText) {
        const regex = /\b(\d+)\sitem/;
        const match = inputText.match(regex);
        if (match) {
            const count = match[1];
            return `${count} items`;
        } else {
            return 'No items found';
        }
    }

}
