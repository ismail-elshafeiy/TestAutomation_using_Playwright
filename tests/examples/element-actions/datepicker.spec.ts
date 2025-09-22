import { test, expect } from '@playwright/test';

test.describe('Example to demonstrate execution of datepicker in Playwright',{ tag: '@examples' }, () => {
    test('Date picker 1', async ({ page }) => { 
        const day = 10;
        await page.goto('https://demo.automationtesting.in/Datepicker.html');
        await page.locator('#datepicker1').click();
        await page.getByTitle('Next').click();
        await page.getByRole('link', { name: day.toString(), exact: true }).click();
        await expect(page.locator('#datepicker1')).toHaveValue('10/10/2025');
    })
    test('Date picker 2', async ({ page }) => {
        await page.goto('https://demo.automationtesting.in/Datepicker.html');
        await page.locator('#datepicker2').click();
        await page.getByRole('combobox').first().selectOption('10/2025');
        await page.getByRole('link', { name: '10' }).click();
        await expect(page.locator('#datepicker2')).toHaveValue('10/10/2025');
      });
});
