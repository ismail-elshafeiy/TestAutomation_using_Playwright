# TestAutomation_using_Playwright

## Prerequisites

You need the following prerequisites installed on your device to be able to run and contribute to this project:

1. Git -> [Download Git](https://git-scm.com/downloads) or [Download GitHub Desktop](https://desktop.github.com/)
2. Visual Studio Code -> [Download VSCode](https://code.visualstudio.com/download)
3. NodeJS -> [Download NodeJS](https://nodejs.org/en/download/)
4. Playwright -> [Installing Playwright for VS Code](https://playwright.dev/docs/getting-started-vscode)

*Note: Always make sure to download the latest stable version compatible with your OS and CPU architecture.

## Using This project

1. Clone the project using GitHub Dekstop.
2. Ensure that you've installed the official Playwright VS Code plugin, and ran ```npm install``` in the project root directory.
3. Open the project folder in VS Code by clicking ```File > Open Folder...```.
4. Open the terminal by clicking ```npm init playwright@latest ```

### - for better inspector run this command ```npx playwright codegen playwright.dev``` and click on any element to inspect it.
### - for running All tests run this command ```npx playwright test```.
### - for running the tests in headless mode run this command ```npx playwright test --headed```.
### - for running a single test run this command ```npx playwright test googleTest.spec.ts```.
### - for running a set of test run this command ```npx playwright tests/googleTests```.
### - for generating the report run this command ```npx playwright show-report reports/playwright-report```.
### - Generate and serve a temporary allure report by running this command ```allure serve reports/allure-results```.
### - Generate and open report by running this command to generate the report ```allure generate reports/allure-results -o allure-report --clean``` and then this command to open the report ```allure open allure-report```.
#### - Open the monocart-report -which provides a lightweight tree view for all your tests in a single file- by opening this file in your preferred browser ```reports/monocart-report/report.html```.
### - Open the native playwright-report by opening this file in your preferred browser ```reports/playwright-report/index.html```.
### - You can download the ```trace.zip``` file from any of the reports, or explore them manually under the ```reports/test-artifacts/``` directory. To open a playwright trace report you should use your preferred browser to navigating to [Playwright Trace Viewer](https://trace.playwright.dev/), and then drag/drop the trace archive file to open it.