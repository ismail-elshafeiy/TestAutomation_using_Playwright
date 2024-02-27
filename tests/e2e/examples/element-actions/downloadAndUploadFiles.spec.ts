import { test, expect } from '@playwright/test';
import { testConfig } from 'config';
const downloadFiles = testConfig.downloadFiles  ;

// https://playwright.dev/docs/downloads
// https://playwright.dev/docs/input#upload-files

const fs = require('fs')
const uploadFilePath = 'tests/data/upload/';


test.describe('Example to demonstrate execution Upload and Download single file methods in Playwright', () => {
    const fileName = 'Screenshot.png';
    test('Upload a Single file and assert', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('input[type="file"]', uploadFilePath + fileName);
        await page.click('#file-submit');
        await expect(page.locator('#uploaded-files')).toContainText(fileName);
    })

    test('Download a Single file and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator(`text=${fileName}`).click()
        ]);
        const suggestedFileName = download.suggestedFilename()
        const filePath = downloadFiles + suggestedFileName
        await download.saveAs(filePath)
        expect(fs.existsSync(filePath)).toBeTruthy()
    })
});

test.describe('Example to demonstrate execution Upload and Download multiple file methods in Playwright', () => {
  const fileName1 =  'example.json';
  const fileName2 = 'Screenshot.png';
  const fileName3 = 'github.png';
    test('Upload Multiple files and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('input[type="file"]', uploadFilePath + fileName1);
        await page.click('#file-submit');
        await page.reload();
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('input[type="file"]', uploadFilePath + fileName2);
        await page.click('#file-submit');
    })

    test('Download Multiple files and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')
        const fileNames = [fileName1, fileName2]
        for (const fileName of fileNames) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.locator(`text=${fileName}`).click()
            ]);
            const suggestedFileName = download.suggestedFilename()
            const filePath = downloadFiles + suggestedFileName
            await download.saveAs(filePath)
            expect(fs.existsSync(filePath)).toBeTruthy()
        }
    })
});


test.describe('Example to demonstrate execution Upload and remove multipe file methods in Playwright', () => {
    const fileName1 =  'example.json';
    const fileName2 = 'Screenshot.png';
    const fileName3 = 'github.png';
      test('Upload Multiple files and assert', async ({ page }) => {
          await page.goto('http://blueimp.github.io/jQuery-File-Upload/')
          await page.setInputFiles('input[type="file"]', [uploadFilePath + fileName1, uploadFilePath + fileName2, uploadFilePath + fileName3])
          await expect(page.locator('p.name').nth(0)).toHaveText(fileName1)
          await expect(page.locator('p.name').nth(1)).toHaveText(fileName2)
          await expect(page.locator('p.name').nth(2)).toHaveText(fileName3)
      })

    test('Remove all selected Files', async ({ page }) => {
        await page.goto('https://west-wind.com/wconnect/wcscripts/fileupload.wwd')
        await page.setInputFiles('input[type="file"]', [uploadFilePath + fileName1, uploadFilePath + fileName2])
        await expect(page.locator('#filename')).toContainText('2 file(s)')
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
        await fileChooser.setFiles( [ uploadFilePath + fileName2, uploadFilePath + fileName3])
       // await (await page.waitForSelector('controls > h2')).isVisible();
      //  await expect(page.locator('.controls > h2')).toHaveText('Upload completed!', { timeout: 9000 })
     let fileNameO2: string = fileName2.replace('.png','');
     let fileNameO3: string = fileName3.replace('.png','');
        await expect(page.locator('.imagetitle').nth(1)).toHaveText(fileNameO2)
        await expect(page.locator('.imagetitle').nth(2)).toHaveText(fileNameO3)
    })
})