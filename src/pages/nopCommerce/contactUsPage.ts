import { Page, Locator, BrowserContext, expect } from '@playwright/test';

export class ContactUsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly fullName_txtField: Locator;
    private readonly email_txtField: Locator;
    private readonly enquiry_txtField: Locator;
    private readonly submit_btn: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.fullName_txtField = page.getByPlaceholder('Enter your name.');
        this.email_txtField = page.getByPlaceholder('Enter your email address.');
        this.enquiry_txtField = page.getByPlaceholder('Enter your enquiry.');
        this.submit_btn = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator("//div[@class='result'][1]");
    }
    async enterFullName(fullName: string) {
        await this.fullName_txtField.fill(fullName);
    }
    async enterEmail(email: string) {
        await this.email_txtField.fill(email);
    }
    async enterEnquiry(enquiry: string) {
        await this.enquiry_txtField.fill(enquiry);
    }
    async clickOnSubmitForm() {
        await this.submit_btn.click();
    }
    async verifySuccessMessage(message: string) {
        await expect(this.successMessage).toHaveText(message);
    }
}