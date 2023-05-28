import test from '@lib/BaseClass';
import { allure } from "allure-playwright";
// page is a Playwright Page object like driver
// context is a window object
// provide page and context to the test to be isolated


test('@Smoke Story #1 - Validate Page Components', async ({ googleHomePage }) => {
    allure.feature('Google POC Feature');
    allure.description('When I navigate to Google homepage, Then the Page Title should be "Google", And the Google Logo should be displayed.');
    await test.step('When I navigate to Google homepage', async () => {
        await googleHomePage.goto();
    });
    await test.step('Then the Page Title should be "Google"', async () => {
        await googleHomePage.expectPageTitleToBeCorrect();
    });

    await test.step('And the Google logo should be displayed', async () => {
        await googleHomePage.expectGoogleLogoToBeDisplayed();
    });
});

test('@Smoke Story #2 - Validate Search Functionality', async ({ googleHomePage, resultsPage}) => {
    allure.feature('Google POC Feature');
    allure.description('When I navigate to Google homepage, And search for "Microsoft Playwright", Then "Result Stats" should not be empty.');
    await test.step('When I navigate to Google homepage', async () => {
        await googleHomePage.goto();
    });
    await test.step('And search for "Microsoft Playwright"', async () => {
        await googleHomePage.searchFor('Microsfot Playwright');
    });
    await test.step('Then "Result Stats" should not be empty', async () => {
        await resultsPage.expectResultStatsToBeNotEmpty();
    });

});