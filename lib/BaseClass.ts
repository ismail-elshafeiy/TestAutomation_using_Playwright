import { test as baseClass } from '@playwright/test';
import { FileActions } from '@lib/FileActions';
import { GoogleHomePage } from '@pages/google/GoogleHomePage';
import { ResultsPage } from '../pageFactory/google/ResultsPage';

/*
 This is the base class for all tests. It is used to extend the classes will be use in all project
instead of using object for each class in test class
 just will import test from '@lib/BaseClass'; in the testClass
 And then add page you need in the parameter in test method
*/

const test = baseClass.extend<{
    fileActions: FileActions;
    googleHomePage: GoogleHomePage;
    resultsPage : ResultsPage;

}>({
    googleHomePage: async ({ page, context }, use) => {
        await use(new GoogleHomePage(page, context));
    },
    resultsPage: async ({ page ,context}, use) => {
        await use(new ResultsPage(page,context));
    },


})

export default test;