import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";


test.describe('Test naviagtions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.google.com/');
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    });

    test('test case #1 - Validate URL and title Page', async ({ page, context }) => {
        allure.epic('Google Epic');
        allure.feature('Google Feature');
        allure.story('Google Story');
        allure.description('When I navigate to Google homepage, Then the Page Title should be "Google", And the Google Logo should be displayed.');
        allure.severity('critical');
            await expect(page).toHaveURL('https://www.google.com/');
            await expect(page).toHaveTitle('Google');
    });

    test('test case #2 - Validate navigation Functionality', async ({ page, context }) => {
        allure.epic('Google Epic');
        allure.feature('Google Feature');
        allure.story('Google Story');
        allure.description('When I navigate to Google homepage, And search for "Microsoft Playwright", Then "Result Stats" should not be empty.');
        await page.goto('https://github.com/ismail-elshafeiy');
        await page.goBack();
        await page.goForward();
        await page.reload();
        expect(page).not.toHaveTitle('');
        expect(page).not.toHaveURL('');
    });
    test('test case #3 - Validate login Functionality', async ({ page, context }) => {
        allure.epic('Google Epic');
        allure.feature('Google Feature');
        allure.story('Google Story 2');
        allure.description('When I navigate to Google homepage, And search for "Microsoft Playwright", Then "Result Stats" should not be empty.');
        await page.goto('https://demo.nopcommerce.com/');
        await page.reload();
        expect(page).not.toHaveTitle('');
        expect(page).not.toHaveURL('');
    });
    test('test case #4 - Validate login Functionality', async ({ page, context }) => {
        allure.epic('Google Epic');
        allure.feature('Google Feature');
        allure.story('Google Story 2');
        allure.description('When I navigate to Google homepage, And search for "Microsoft Playwright", Then "Result Stats" should not be empty.');
        await page.goto('https://demo.nopcommerce.com/');
        
    });

 
});