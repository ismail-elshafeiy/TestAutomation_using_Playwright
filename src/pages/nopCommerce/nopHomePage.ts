import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { PageBase } from '../../lib/PageBase';

export class NopHomePage extends PageBase{
    readonly page: Page;
    readonly context: BrowserContext;
    readonly nopBaseUrl: 'https://demo.nopcommerce.com/';
    private readonly register_linktxt: Locator;
    private readonly login_linkTxt: Locator;
    private readonly wishlist_linkTxt: Locator;
    private readonly myAccount_linkTxt: Locator;
    private readonly contactUs_linkTxt: Locator;
    private readonly logout_btn: Locator;
    private readonly search_txtField: Locator;
    private readonly search_btn: Locator;


    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.register_linktxt = page.locator('css=a.ico-register');
        this.login_linkTxt = page.locator('css=a.ico-login');
        this.wishlist_linkTxt = page.locator('css=a.ico-wishlist');
        this.myAccount_linkTxt = page.locator('css=a.ico-account');
        this.contactUs_linkTxt = page.getByRole('link', { name: 'Contact us' });
        this.logout_btn = page.locator('css=a.ico-logout');
        this.search_txtField=page.locator("xpath=//*[@id='small-searchterms']");
        this.search_btn = page.getByRole('button', { name: 'Search' });
    }
    async navigateToHomePage() {
        await this.page.goto('https://demo.nopcommerce.com/');
    }
    async openRegisterPage() {
        await this.register_linktxt.click();
    }
    async openLoginPage() {
        await this.login_linkTxt.click();
    }
    async openWishlistPage() {
        await this.wishlist_linkTxt.click();
    }
    async openContactUsPage(){
        await this.contactUs_linkTxt.click();
    }
    async openMyAccountPage(){
        await this.myAccount_linkTxt.check();
    }
    async clickOnLogout() {
        await this.logout_btn.click();
    }
    async searchForProduct(productName:string){
        await this.search_txtField.fill(productName);
        (await this.searchList(1)).click();
    }

}
