import { test as baseClass } from '@playwright/test';
import { WebActions } from '@lib/WebActions';
import { FileActions } from '@lib/data-driven/FileActions';
import { FakerData } from '@lib/data-driven/FakerData';
import { DBActions } from './actions/DBActions';
import { GoogleHomePage } from '@features/google/googleHomePage';
import { ResultsPage } from '@features/google/resultsPage';
import { HomePage } from '@features/examples/homePage';
import { TopMenuPage } from '@features/examples/topMenuPage';

import { NopHomePage } from '@features/nopCommerce/nopHomePage';
import { RegisterPage } from '@features/nopCommerce/registerPage';
import { LoginPage } from '@features/nopCommerce/loginPage';
import { MyAccountPage } from '@features/nopCommerce/myAccount';
import { ContactUsPage } from '@features/nopCommerce/contactUsPage';
import { ProductDetailsPage } from '@features/nopCommerce/productDetails';

/*
 This is the base class for all tests. It is used to extend the classes will be use in all project
 instead of using object for each class in test class
 just will import test from '@lib/BaseClass'; in the testClass
 And then add page you need in the parameter in test method
*/

const test = baseClass.extend<{
  // Declare the types of your fixtures.
  webActions: WebActions;
  fileActions: FileActions;
  fakerData: FakerData;
  dbActions: DBActions;
  googleHomePage: GoogleHomePage;
  resultsPage: ResultsPage;
  homePage: HomePage;
  topMenuPage: TopMenuPage;
  nopHomePage: NopHomePage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  contactUsPage: ContactUsPage;
  productDetailsPage: ProductDetailsPage;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
  fileActions: async ({ page, context }, use) => {
    await use(new FileActions(page, context));
  },
  fakerData: async ({}, use) => {
    await use(new FakerData());
  },
  dbActions: async ({ page, context }, use) => {
    await use(new DBActions());
  },
  googleHomePage: async ({ page, context }, use) => {
    await use(new GoogleHomePage(page, context));
  },
  resultsPage: async ({ page, context }, use) => {
    await use(new ResultsPage(page, context));
  },
  homePage: async ({ page, context }, use) => {
    await use(new HomePage(page, context));
  },
  topMenuPage: async ({ page, context }, use) => {
    await use(new TopMenuPage(page, context));
  },
  nopHomePage: async ({ page, context }, use) => {
    await use(new NopHomePage(page, context));
  },
  registerPage: async ({ page, context }, use) => {
    await use(new RegisterPage(page, context));
  },
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  myAccountPage: async ({ page, context }, use) => {
    await use(new MyAccountPage(page, context));
  },
  contactUsPage: async ({ page, context }, use) => {
    await use(new ContactUsPage(page, context));
  },
  productDetailsPage: async ({ page, context }, use) => {
    await use(new ProductDetailsPage(page, context));
  },
});
export default test;
