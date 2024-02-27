import { test as baseClass } from '@playwright/test';
import { WebActions } from '@lib/WebActions';
import { FileActions } from '@lib/FileActions';
import { FakerData } from '@lib/FakerData';
import { GoogleHomePage } from '@pages/google/googleHomePage';
import { ResultsPage } from '@pages/google/resultsPage';
import { HomePage } from '@pages/examples/homePage';
import { TopMenuPage } from '@pages/examples/topMenuPage';

import { NopHomePage } from '@pages/nopCommerce/nopHomePage';
import { RegisterPage } from '@pages/nopCommerce/registerPage';
import { LoginPage } from '@pages/nopCommerce/loginPage';
import { MyAccountPage } from '@pages/nopCommerce/myAccount';
import { ContactUsPage } from '@pages/nopCommerce/contactUsPage';
import { ProductDetailsPage } from '@pages/nopCommerce/productDetails';



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
    fakerData: async ({ }, use) => {
        await use(new FakerData());
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
    }
})
export default test;


