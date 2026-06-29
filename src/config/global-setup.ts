import { test as setup, expect } from '@playwright/test';
import { owner, epic, feature } from 'allure-js-commons';
import { FakerData } from '@lib/data-driven/FakerData';
import { rimraf } from 'rimraf';
import envConfig from '../constants/env';

async function globalSetup(): Promise<void> {
  await new Promise((resolve) => {
    rimraf(`./reports/allure-results`);
  });
}
// setup('Register by Admin', async ({ page, context }) => {
//     await owner('Ismail elshafeiy');
//     await epic('Setup');
//     await feature('Register & Login')
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
//     await page.context().storageState({ path: envConfig.adminAuth });
// })
export default globalSetup;
