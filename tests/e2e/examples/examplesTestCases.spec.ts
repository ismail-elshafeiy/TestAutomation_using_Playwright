import test from "@lib/BaseFixtures";

const URL = "https://playwright.dev/";

const pageUrl = /.*intro/;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

// async function clickGetStarted() {
//     await homePage.clickGetStarted();
//     // topMenuPage = new TopMenuPage(page);
// }

test.describe("Playwright website", () => {
  test("has title", async ({ homePage }) => {
    await homePage.assertPageTitle();
  });

  test("get started link", async ({ homePage, topMenuPage }) => {
    // Act
    await homePage.clickGetStarted();
    // Assert
    await topMenuPage.assertPageUrl(pageUrl);
  });

  test("check Java page", async ({ homePage, topMenuPage }) => {
    await test.step("Act", async () => {
      await homePage.clickGetStarted();
      await topMenuPage.hoverNode();
      await topMenuPage.clickJava();
    });

    await test.step("Assert", async () => {
      await topMenuPage.assertPageUrl(pageUrl);
      await topMenuPage.assertNodeDescriptionNotVisible();
      await topMenuPage.assertJavaDescriptionVisible();
    });
  });
});
