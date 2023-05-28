import { test as baseClass } from '@playwright/test';
import { FileActions } from '@lib/FileActions';
import { GoogleHomePage } from '../pageFactory/google/GoogleHomePage';
import { ResultsPage } from '../pageFactory/google/ResultsPage';

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