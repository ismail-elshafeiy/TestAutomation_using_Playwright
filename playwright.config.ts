import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './config';

const RPconfig = {
  apiKey: 'myKey_K4xCMQuGQkaYCQvAXZePoABVBg4aWz9VIQIY3OSZID4-w_KZHlS-pI8gE7oGPjIR',
  endpoint: 'https://demo.reportportal.io/api/v1',
  project: 'ismail-elshafeiy_personal',
  launch: 'Test Launch',
  attributes: [
    {
      key: 'key',
      value: 'value',
    },
    {
      value: 'value',
    },
  ],
  description: 'Your launch description',
};
const ENV = 'https://demo.nopcommerce.com/';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// const ENV = process.env.ENV;
// if (!ENV || ![`stg`, `prod`].includes(ENV)) {
//   console.log(`Please provide a correct environment value like "npx cross-env ENV=stg|prod"`);
//   process.exit();
// }

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //Global Setup to run before all tests
  //globalSetup: `tests/config/global-config`,
  //Global Teardown to run after all tests
  // globalTeardown: `./global-tearDown.ts`,
  testDir: './',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: testConfig[process.env.ENV],
    testIdAttribute: 'data-testid',
    headless: true,
    viewport: { width: 1500, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: `on`,
    trace: `on`,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    ['@reportportal/agent-js-playwright', RPconfig],
    [`./src/lib/CustomReporter.ts`],
    ['list'],
    [
      'html',
      {
        open: 'always',
        outputFolder: 'reports/playwright-report',
      },
    ],
    [
      'allure-playwright',
      {
        open: 'always',
        outputFolder: 'reports/allure-results',
        detail: true,
        suiteTitle: false,
        disableWebdriverStepsReporting: true,
      },
    ],
    [
      'json',
      {
        outputFile: 'reports/json-report/test-results.json',
      },
    ],
    [
      'monocart-reporter',
      {
        name: 'Playwright Test Report',
        outputFile: 'reports/monocart-report/report.html',
      },
    ],
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'reports/test-artifacts/',
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "Setup",
    //   testMatch: "global-setup.ts",
    // },
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        //     storageState: testConfig.ownerAuth,
        channel: `chrome`,
        //Slows down execution by ms
        launchOptions: {
          slowMo: 0,
        },
      },
      //  dependencies: ["Setup"],
    },
    // {
    //   name: `Device`,
    //   use: {
    //     // ...devices[`Pixel 4a (5G)`],
    //     ...devices[`iPhone 11 Pro Max`],
    //     browserName: `chromium`,
    //     storageState: testConfig.ownerAuth,
    //     channel: `chrome`,
    //     //Slows down execution by ms
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    //   dependencies: ['Setup']
    // },
    // {
    //   name: `Chrome`,
    //   use: {
    //     // Configure the browser to use.
    //     browserName: `chromium`,
    //     storageState: testConfig.adminAuth,
    //     //Chrome Browser Config
    //     channel: `chrome`,
    //     //Slows down execution by ms
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    //   dependencies: ['Setup']
    // },

    // {
    //   name: `Chrome`,
    //   use: {
    //     browserName: `chromium`,
    //     channel: `chrome`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },

    // {
    //   name: `Edge`,
    //   use: {
    //     browserName: `chromium`,
    //     channel: `msedge`,
    //     baseURL: testConfig[process.env.ENV],
    //     headless: false,
    //     viewport: { width: 1500, height: 730 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },
    // {
    //   name: `WebKit`,
    //   use: {
    //     browserName: `webkit`,
    //     baseURL: testConfig[process.env.ENV],
    //     headless: true,
    //     viewport: { width: 1500, height: 730 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0
    //     }
    //   },
    // },

    // {
    //   name: `API`,
    //   use: {
    //     baseURL: testConfig[process.env.ENV]
    //   }
    // }
  ],
});
