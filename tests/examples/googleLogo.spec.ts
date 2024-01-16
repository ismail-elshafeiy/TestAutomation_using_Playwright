import test from '@lib/BaseFixtures';
import testData from 'tests/data/google.json';
import { allure } from "allure-playwright";



// page is a Playwright Page object like driver
// context is a window object
// provide page and context to the test to be isolated

test.describe('Playwright website', () => {

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

});