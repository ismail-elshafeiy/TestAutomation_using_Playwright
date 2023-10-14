import { Page, Locator, BrowserContext, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    private readonly email_TxtBox: Locator;
    private readonly password_TxtBox: Locator;
    private readonly rememberMe_ChkBx: Locator;
    private readonly login_Btn: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.email_TxtBox = page.locator('#Email');
        this.password_TxtBox = page.locator('#Password');
        this.login_Btn = page.locator('css=button.button-1.login-button')
    }
    async doLogin(email: string, password: string) {
        await this.email_TxtBox.fill(email);
        await this.password_TxtBox.fill(password);
        await this.login_Btn.click();
    }
} 