import { test, expect } from '@playwright/test';

test.describe('Example to demonstrate File Upload in Playwright', () => {

    test('Upload a Single file and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('input[type="file"]', 'upload/D.png')
        await page.click('#file-submit')
        await expect(page.locator('#uploaded-files')).toContainText('D.png')
    })

    test('Upload Multiple files and assert', async ({ page }) => {
        await page.goto('http://blueimp.github.io/jQuery-File-Upload/')
        await page.setInputFiles('input[type="file"]', ['upload/D.png', 'upload/D_Dark.png', 'upload/github.png'])
        await expect(page.locator('p.name').nth(0)).toHaveText('D.png')
        await expect(page.locator('p.name').nth(1)).toHaveText('D_Dark.png')
        await expect(page.locator('p.name').nth(2)).toHaveText('github.png')
    })

    test('Remove all selected Files', async ({ page }) => {
        await page.goto('https://west-wind.com/wconnect/wcscripts/fileupload.wwd')
        await page.setInputFiles('input[type="file"]', 'upload/D.png')
        await expect(page.locator('#filename')).toContainText('1 file(s)')
        await page.setInputFiles('input[type="file"]', []) //remove all selected files
        await expect(page.locator('#filename')).toContainText('0 file(s)')
    })

    test('Upload files for non-input element and assert', async ({ page }) => {
        await page.goto('https://postimages.org/')
        // Note that Promise.all prevents a race condition
        // between clicking and waiting for the file chooser.
        const [fileChooser] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            page.locator('#uploadFile').click(),
          ]);
        await fileChooser.setFiles(['upload/D.png', 'upload/D_Dark.png', 'upload/github.png'])
        await expect(page.locator('.controls > h2')).toHaveText('Upload completed!', { timeout: 9000 })
        await expect(page.locator('.imagetitle').nth(0)).toHaveText('D')
        await expect(page.locator('.imagetitle').nth(1)).toHaveText('D_Dark')
        await expect(page.locator('.imagetitle').nth(2)).toHaveText('github')
    })
})