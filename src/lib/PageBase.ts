import { Page, expect, Locator, BrowserContext } from '@playwright/test'

export class PageBase {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context?: BrowserContext) {
        this.page = page;
        this.context = context
    }
    /**
     * This is a dynamic locator for buttons by text
     * @param buttonName 
     * @returns 
     */

    async buttonName(buttonName: string): Promise<Locator> {
        return this.page.locator(`xpath=//button[@type='button' and contains(.,'${buttonName}')]`);
    }
    async dropDnList(optionName: string): Promise<Locator> {
        return this.page.locator(`xpath=//div[@class='ant-select-item-option-content' and text()='${optionName}']`);
    }
    async searchList(resultIndex: number) {
        return this.page.locator(`xpath=//li[contains(@class,'ui-menu-item')][${resultIndex}]`)
    }
}