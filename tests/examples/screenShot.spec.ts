import { test, expect } from '@playwright/test';
import envConfig from 'src/constants/envConfig';
const downloadFiles = envConfig.downloadFiles;

test.describe('Example to demonstrate screenshot in Playwright', () => {
  test('Capture screenshot of the visible window', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.screenshot({ path: downloadFiles + 'visibleWindow.png' });
  });

  test('Capture screenshot of the entire scrollable webpage', async ({ page }) => {
    await page.goto('https://pixabay.com/');
    await page.screenshot({ path: downloadFiles + 'fullPage.png', fullPage: true });
  });

  test('Capture screenshot of an element', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.locator('#dropdown').screenshot({ path: downloadFiles + 'elementScreenshot.png' });
  });
});
