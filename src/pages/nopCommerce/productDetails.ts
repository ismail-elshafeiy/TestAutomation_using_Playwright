import { Page, Locator, BrowserContext, expect } from "@playwright/test";
import { PageBase } from "../../lib/PageBase";

export class ProductDetailsPage extends PageBase {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly productNameInProductDetails: Locator;
  readonly productNameInCart: Locator;
  readonly addToCartBtn: Locator;
  readonly addToWishlistBtn: Locator;
  readonly emailFriendBtn: Locator;
  readonly addToCartSuccessMsg: Locator;
  readonly addToWishlistSuccessMsg: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.page = page;
    this.context = context;
    this.productNameInProductDetails = page.locator("css=h1");
    this.productNameInCart = page.locator("css=a.product-name");
    this.addToCartBtn = page.locator(
      "xpath=//button[@id='add-to-cart-button-4']"
    );
    this.addToWishlistBtn = page.locator(
      "xpath=//button[@id='add-to-wishlist-button-4']"
    );
    this.emailFriendBtn = page.locator('css=input[value="Email a friend"]');
    this.addToCartSuccessMsg = page.locator("css=.bar-notification.success");
    this.addToWishlistSuccessMsg = page.locator("css=.bar-notification.success");
  }


  async addProductToCart() {
    await this.addToCartBtn.click();
  }
  async addProductToWishlist() {
    await this.addToWishlistBtn.click();
  }
  async openEmailFriend() {
    await this.emailFriendBtn.click();
  }

  async validateProductNameInProductDetails(expectedProductName: string) {
    await expect(this.productNameInProductDetails).toHaveText(
      expectedProductName
    );
  }
  async validateSuccessMessage(expectedSuccessMsg: string) {
    await expect(this.addToCartSuccessMsg).toHaveText(expectedSuccessMsg);
  }
}
