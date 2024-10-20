import test from "@lib/BaseFixtures";
import { allure } from "allure-playwright";
test.beforeEach("Navigate to home page", async ({ nopHomePage }) => {
  await nopHomePage.navigateToHomePage();
});
test.afterEach("Close Browser", async ({ page }) => {
  page.close();
});

test("@Regression tc #3 - Contact us", async ({ fakerData, nopHomePage, contactUsPage }) => {
  allure.owner("Ismail elshafeiy");
  allure.epic("User");
  allure.feature("Contact Us");
  allure.story("As an user, i want to contact us");
  allure.description("");
  allure.severity("Critical");
  await test.step("Navigate to contact us page", async () => {
    await nopHomePage.openContactUsPage();
  });
  await contactUsPage.enterFullName(fakerData.setFirstName());
  await test.step("Enter email", async () => {
    await contactUsPage.enterEmail(fakerData.setEmail());
  });
  await test.step("Enter enquiry", async () => {
    await contactUsPage.enterEnquiry(fakerData.setTextLinesLimit(2));
  });
  await test.step("Click on submit button", async () => {
    await contactUsPage.clickOnSubmitForm();
  });
  await test.step("Validate the success message", async () => {
    await contactUsPage.verifySuccessMessage("Your enquiry has been successfully sent to the store owner.");
  });
});
