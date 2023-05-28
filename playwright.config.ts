import type { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './utils/config/test-config';

const ENV = 'https://the-internet.herokuapp.com/'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./utils/config/global-config.ts'),
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',

  reporter: [
    [`./lib/CustomReporter.ts`],
    ['list'],
    // open : always, on-first-retry, on-first-failure, nevernpx playwright show-report
    ['html', {
      open: 'always',
      outputFolder: 'reports/playwright-report'
    }],
    ['allure-playwright', {
      outputFolder: 'reports/allure-results',
      detail: true,
      suiteTitle: false
    }],
    ['json', {
      outputFile: 'reports/json-report/test-results.json'
    }],
    ['monocart-reporter', {
      name: "Playwright Test Report",
      //the dir relative process.cwd
      outputFile: 'reports/monocart-report/report.html'
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: ENV,
    headless: false,
    viewport: { width: 1920, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    // off, on , on-first-retry , retain-on-failure'
    video: `retain-on-failure`,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `retain-on-failure`
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,

        //Chrome Browser Config
        channel: `chrome`,
        //Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      },
    },
    // {
    //   name: `Chromium`,
    //   use: {
    //     browserName: `chromium`,
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
    //   name: `Firefox`,
    //   use: {
    //     browserName: `firefox`,
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
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'reports/test-artifacts/',
};
export default config;
