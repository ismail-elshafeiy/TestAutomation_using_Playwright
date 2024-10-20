import test from "@lib/BaseFixtures";
import { allure } from "allure-playwright";

test.beforeEach("Navigate to home page", async ({ nopHomePage }) => {
  await nopHomePage.navigateToHomePage();
});
test.afterEach("Close Browser", async ({ page }) => {
  page.close();
});

test.describe("Product Test Cases", () => {
  test("@Smoke tc #1 - Verify that the guest can add product to cart", async ({ nopHomePage, productDetailsPage }) => {
    allure.owner("Ismail elshafeiy");
    allure.epic("Product Module");
    allure.feature("Product Details");
    allure.story("As an user, i want to add product to cart");
    allure.description("");
    allure.severity("Critical");
    let productName: string = "Apple MacBook Pro 13-inch";
    await test.step("LogOut", async () => {
      await nopHomePage.clickOnLogout();
    });
    await test.step("Search for product", async () => {
      await nopHomePage.searchForProduct(productName);
    });
    await test.step("Add product to cart", async () => {
      await productDetailsPage.addProductToCart();
    });
    await test.step("Validate the success message", async () => {
      await productDetailsPage.validateSuccessMessage("The product has been added to your shopping cart");
    });
  });
});
