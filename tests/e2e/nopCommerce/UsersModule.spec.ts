import test from "@lib/BaseFixtures";
import { allure } from "allure-playwright";
import { testConfig } from "../../../config";

const testUrl = testConfig.testUrl;
const issueUrl = testConfig.issueUrl;

test.beforeEach("Navigate to home page", async ({ nopHomePage }) => {
  await nopHomePage.navigateToHomePage();
});
test.afterEach("Close Browser", async ({ page }) => {
  page.close();
});
test.describe("Register Test Cases", () => {
  test("@Smoke tc #1 - Verify that the user can Register with required data", async ({
    fakerData,
    nopHomePage,
    registerPage,
  }) => {
    allure.owner("Ismail elshafeiy");
    allure.epic("User Module");
    allure.feature("Register Module");
    allure.story("As an user, i want to register new user");
    allure.description("");
    allure.severity("Critical");
    allure.tms("123", testUrl);
    allure.issue("321", issueUrl);
    await test.step("Log Out", async () => {
      await nopHomePage.clickOnLogout();
    });
    await test.step("Open register page", async () => {
      await nopHomePage.openRegisterPage();
    });
    await test.step("Enter first name", async () => {
      await registerPage.enterFirstName(fakerData.setFirstName());
    });
    await test.step("Enter last name ${data}", async () => {
      await registerPage.enterLastName(fakerData.setLastName());
    });
    await test.step("Enter email", async () => {
      await registerPage.enterEmail(fakerData.setEmail());
    });
    await test.step("Enter password", async () => {
      await registerPage.enterPassword("Tester@2023");
    });
    await test.step("Enter confirm password", async () => {
      await registerPage.enterConfirmPassword("Tester@2023");
    });
    await test.step("Click on register button", async () => {
      await registerPage.clickRegisterBtn();
    });
    await test.step("Validate the success message", async () => {
      await registerPage.validateSuccessMessage("Your registration completed");
    });
  });
  test("@Smoke tc #2 - Verify that the user can Register with all data", async ({
    fakerData,
    nopHomePage,
    registerPage,
  }) => {
    allure.owner("Ismail elshafeiy");
    allure.epic("User Module");
    allure.feature("Register Module");
    allure.story("As an user, i want to register new user");
    allure.description("");
    allure.severity("Critical");
    allure.tms("123", testUrl);
    allure.issue("321", issueUrl);
    await test.step("Log Out", async () => {
      await nopHomePage.clickOnLogout();
    });
    await nopHomePage.openRegisterPage();
    await test.step("Select genedar: ${0}", async () => {
      await registerPage.selectGendar("female");
    });
    await registerPage.enterFirstName(fakerData.setFirstName());
    await registerPage.enterLastName(fakerData.setLastName());
    await registerPage.selectBirthDay("1", "October", "1993");
    await registerPage.enterEmail(fakerData.setEmail());
    await registerPage.enterCompanyName(fakerData.setFullName());
    await registerPage.checkNewsLetter("uncheck");
    await registerPage.enterPassword("Tester@2023");
    await registerPage.enterConfirmPassword("Tester@2023");
    await registerPage.clickRegisterBtn();
    await registerPage.validateSuccessMessage("Your registration completed");
  });
});
test.describe("Change password Test Cases", () => {
  test("@Smoke tc #3 - Change Password", async ({
    nopHomePage,
    myAccountPage,
  }) => {
    allure.owner("Ismail elshafeiy");
    allure.epic("User Module");
    allure.feature("Change Password");
    allure.story("As an user, i want to change my password");
    allure.description("");
    allure.severity("Critical");
    allure.tms("123", testUrl);
    allure.issue("321", issueUrl);
    nopHomePage.openMyAccountPage();
    myAccountPage.openChangeMyPassword();
    myAccountPage.enterOldPassword("Tester@2023");
    myAccountPage.enterNewPassword("Tester@2023");
    myAccountPage.clickOnChangePasswordbutton();
    myAccountPage.verifySuccessMessage("Password was changed");
  });
});
