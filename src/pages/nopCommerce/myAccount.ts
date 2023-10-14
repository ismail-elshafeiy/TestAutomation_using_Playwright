import { Page, Locator, BrowserContext, expect } from '@playwright/test';

export class MyAccountPage {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly changePassword_linkTxt: Locator;
    private readonly oldPassword_txtField: Locator;
    private readonly newPassword_txtField: Locator;
    private readonly confirmPassword_txtField: Locator;
    private readonly changePassword_btn: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.changePassword_linkTxt = page.getByRole('link', { name: 'Change password' });
        this.oldPassword_txtField = page.locator('#OldPassword');
        this.newPassword_txtField = page.locator('#NewPassword');
        this.confirmPassword_txtField = page.locator('#ConfirmNewPassword');
        this.changePassword_btn = page.locator('css=button.button-1.change-password-button');
        this.successMessage = page.locator("xpath=//p[@class='content']");
    }
    async openChangeMyPassword() {
        await this.changePassword_linkTxt.click();
    }
    async enterOldPassword(oldPassword: string) {
        await this.oldPassword_txtField.fill(oldPassword);
    }
    async enterNewPassword(newPassword: string) {
        await this.newPassword_txtField.fill(newPassword);
        await this.confirmPassword_txtField.fill(newPassword);
    }
    async clickOnChangePasswordbutton() {
        await this.changePassword_btn.click();
    }
    async verifySuccessMessage(message: string) {
        await expect(this.successMessage).toHaveText(message);
    }
}
