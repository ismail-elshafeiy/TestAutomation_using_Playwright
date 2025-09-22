import { test as setup, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { NopHomePage } from '@pages/nopCommerce/nopHomePage';
import { RegisterPage } from '@pages/nopCommerce/registerPage';
import { LoginPage } from '@pages/nopCommerce/loginPage';
import { FakerData } from '@lib/FakerData';
import { rimraf } from 'rimraf';
import { testConfig } from './envConfig';

async function globalSetup(): Promise<void> {
  await new Promise((resolve) => {
    rimraf(`./reports/allure-results`);
  });
}
setup('Register by Owner', async ({ page, context }) => {
  allure.owner('Ismail elshafeiy');
  allure.epic('Setup');
  allure.feature('Register & Login');
  // globalSetup();
  const nopHomePage = new NopHomePage(page, context);
  const registerPage = new RegisterPage(page, context);
  const loginPage = new LoginPage(page, context);
  const fakerData = new FakerData();
  const password = 'Tester@2022',
    email = fakerData.setEmail();
  await nopHomePage.navigateToHomePage();
  await nopHomePage.openRegisterPage();
  await registerPage.enterFirstName(fakerData.setFirstName());
  await registerPage.enterLastName(fakerData.setLastName());
  await registerPage.enterEmail(email);
  await registerPage.enterPassword(password);
  await registerPage.enterConfirmPassword(password);
  await registerPage.clickRegisterBtn();
  await registerPage.validateSuccessMessage('Your registration completed');
  await nopHomePage.openLoginPage();
  await loginPage.doLogin(email, password);
  await page.context().storageState({ path: testConfig.ownerAuth });
});
// setup('Register by Admin', async ({ page, context }) => {
//     allure.owner('Ismail elshafeiy');
//     allure.epic('Setup');
//     allure.feature('Register & Login')
//     const nopHomePage = new NopHomePage(page, context);
//     const registerPage = new RegisterPage(page, context);
//     const loginPage = new LoginPage(page, context);
//     const fakerData = new FakerData();
//     const password = "Tester@2022", email = fakerData.setEmail();
//     await nopHomePage.navigateToHomePage();
//     await nopHomePage.openRegisterPage();
//     await registerPage.enterFirstName(fakerData.setFirstName());
//     await registerPage.enterLastName(fakerData.setLastName());
//     await registerPage.enterEmail(email);
//     await registerPage.enterPassword(password);
//     await registerPage.enterConfirmPassword(password);
//     await registerPage.clickRegisterBtn();
//     await registerPage.validateSuccessMessage('Your registration completed');
//     await nopHomePage.openLoginPage();
//     await loginPage.doLogin(email, password);
//     await page.context().storageState({ path: testConfig.adminAuth });
// })
export default globalSetup;
