import { test, expect } from '@playwright/test';
//https://playwright.dev/docs/input#checkboxes-and-radio-buttons
test.describe('Example to demonstrate execution checkbox methods in Playwright', () => {

    test('Working with Checkboxes 1', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/checkboxes')
        //Assert that the checkboxes are visible on the webpage
        await expect(page.locator('#checkboxes')).toBeVisible()
        //Assert checkbox1 is un-checked
        expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeFalsy()
        //Assert checkbox2 is checked
        expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeTruthy()
        //Check checkbox 1
        await page.check('input[type=checkbox]:nth-child(1)')
        //Un-check checkbox 2
        await page.uncheck('input[type=checkbox]:nth-child(3)')
        //Assert checkbox1 is now checked
        expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeTruthy()
        //Assert checkbox2 is now un-checked
        expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeFalsy()
    });
    test('Working with Checkboxes 2', async ({ page }) => {

        await page.goto('https://www.w3schools.com/howto/howto_css_custom_checkbox.asp');
        // $$ -> finds all elements matching the specified selector
        const checkBx = await page.$$('#main div :nth-child(1) input[type="checkbox"]');
        // uncheck the first checkbox
        await checkBx[0].uncheck();
        // check the second checkbox
        await checkBx[1].check();
        //select the second radio button
        const radios = await page.$$('#main div :nth-child(1) input[type="radio"]');
        await radios[1].check();
    });
    test('Working with Checkboxes 3', async ({ page }) => {
        await page.goto('https://www.apronus.com/music/lessons/unit01.htm');
        // click on  the keynotes
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button')
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(3) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(3) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(6) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(6) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(10) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(6) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(10) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(8) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(6) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(5) > button');
        await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button');
        
     
    })
});