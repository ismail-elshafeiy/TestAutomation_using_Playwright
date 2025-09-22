import { test, expect } from '@playwright/test';
// https://playwright.dev/docs/evaluating
test.describe('Example to demonstrate execution of HTML Document methods in Playwright',{ tag: '@examples' }, () => {
  test('Extract innerText and assert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    var locator = await page.evaluate(() => document.querySelector('h1').innerText);
    await expect(locator).toEqual('Welcome to the-internet');
  });

  test('Get the current URL and assert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator('text=A/B Testing').click();
    var url = await page.evaluate(() => document.URL);
    await expect(url).toEqual('https://the-internet.herokuapp.com/abtest');
  });

  test('Count the total number of urls and assert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    var length = await page.evaluate(() => document.URL.length);
    await expect(length).toEqual(35);
  });
  test('Count Ur', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const href = page.$$('li > a');
    await console.log('The Length is: ' + (await href).length);
  });

  test('Count the total number of href and assert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const href = await page.evaluate(() => document.location.href.length);
    await console.log('The Length is: ' + href);
    await expect(href).toEqual(35);
  });
  test('Count the total number of images and assert', async ({ page }) => {
    await page.goto('https://pixabay.com/');
    var length = await page.evaluate(() => document.images.length);
    await expect(length).toEqual(43);
  });

  test('Get the Tag Name and assert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    var tagName = await page.evaluate(() => document.getElementById('username').tagName);
    await expect(tagName).toEqual('INPUT');
  });
});
