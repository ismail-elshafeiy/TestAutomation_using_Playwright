import { Page, Locator, BrowserContext, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly gendar_radioBtn: Locator;
    private readonly firstName_txtField: Locator;
    private readonly lastName_txtField: Locator;
    private readonly day_list: Locator;
    private readonly month_list: Locator;
    private readonly year_list: Locator;
    private readonly companyName_txtField: Locator;
    private readonly newsLetter_checkbx: Locator;
    private readonly email_txtField: Locator;
    private readonly password_txtField: Locator;
    private readonly confirmPasswotd_txField: Locator;
    private readonly register_btn: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.firstName_txtField = page.locator('#FirstName');
        this.lastName_txtField = page.locator('#LastName');
        this.day_list = page.locator("xpath=//select[@name='DateOfBirthDay']");
        this.month_list = page.locator("xpath=//select[@name='DateOfBirthMonth']");
        this.year_list = page.locator("xpath=//select[@name='DateOfBirthYear']");
        this.email_txtField = page.locator('#Email');
        this.companyName_txtField = page.locator('#Company');
        this.newsLetter_checkbx = page.locator('#Newsletter');
        this.password_txtField = page.locator('#Password');
        this.confirmPasswotd_txField = page.locator('#ConfirmPassword');
        this.register_btn = page.locator('css=button#register-button.button-1.register-next-step-button');
        this.successMessage = page.locator('css=div.result');
    }
    async selectGendar(gendar: string) {
        await this.page.locator("xpath=//div/span[@class='" + gendar.toLocaleLowerCase() + "']").click();
    }
    async enterFirstName(firstName: string) {
        await this.firstName_txtField.fill(firstName);
    }
    async enterLastName(lastName: string) {
        await this.lastName_txtField.fill(lastName);
    }
    async selectBirthDay(day: string, month: string, year: string) {
        await this.day_list.selectOption(day);
        await this.month_list.selectOption(month);
        await this.year_list.selectOption(year);
    }
    async enterCompanyName(companyName: string) {
        await this.companyName_txtField.fill(companyName);
    }
    async checkNewsLetter(state: string) {
        if (state.toLowerCase().includes('check') && !this.newsLetter_checkbx.isChecked) {
            await this.newsLetter_checkbx.check();
        } else if (state.toLowerCase().includes('uncheck')) {
            await this.newsLetter_checkbx.uncheck();
        } else {
            console.log('The checkbox is already checked');
        }
    }

    async enterEmail(email: string) {
        await this.email_txtField.fill(email);
    }
    async enterPassword(password: string) {
        await this.password_txtField.fill(password);
    }
    async enterConfirmPassword(confirmPassword: string) {
        await this.confirmPasswotd_txField.fill(confirmPassword);
    }
    async clickRegisterBtn() {
        await this.register_btn.click();
    }
    async registerNewUserWithRequiredData(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        await this.firstName_txtField.fill(firstName);
        await this.lastName_txtField.fill(lastName);
        await this.email_txtField.fill(email);
        await this.password_txtField.fill(password);
        await this.confirmPasswotd_txField.fill(confirmPassword);
    }
    async validateSuccessMessage(textExpected: string) {
        await expect(this.successMessage).toHaveText(textExpected);
    }
}
