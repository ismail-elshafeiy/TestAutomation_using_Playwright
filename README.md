# TestAutomation_using_Playwright

<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
            <li> <a href="#about-the-project">About the Project</a> </li>
            <li> <a href="#technologies">Technology</a> </li>
            <li> <a href="#prerequisites">Prerequisites</a> </li>
            <li> <a href="#installation">Installation</a> </li>
            <li> <a href="#using-inspector">Using Inspector</a> </li>
            <li> <a href="#command-lines">Command lines</a> </li>
            <li> <a href="#allure-report">Allure Report</a> </li>
        </h5>    
    </details>
</h2>

<!-- Technologies -->

## Technologies
---

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [excel-js](https://github.com/exceljs/exceljs)
- [adm-zip](https://www.npmjs.com/package/adm-zip)
- [ESLint](https://eslint.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [pdfjs-dist-es5](https://www.npmjs.com/package/pdfjs-dist-es5)
- [allure-playwright](https://www.npmjs.com/package/allure-playwright)
- [allure-commandline](https://www.npmjs.com/package/allure-commandline)

## Prerequisites
---

You need the following prerequisites installed on your device to be able to run and contribute to this project:

1. Git -> [Download Git](https://git-scm.com/downloads) or [Download GitHub Desktop](https://desktop.github.com/)
2. Visual Studio Code -> [Download VSCode](https://code.visualstudio.com/download)
3. NodeJS -> [Download NodeJS](https://nodejs.org/en/download/)
4. Getting start from the [Playwright docs](https://playwright.dev/docs/getting-started-vscode)
4. Playwright marketplace-> [Installing Playwright test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

**Note:** Always make sure to download the latest stable version compatible with your OS and CPU architecture.

## Installation
---

1. Clone the project using GitHub Dekstop.
2. Ensure that you've installed the official Playwright VS Code plugin, and ran this Command line in the project root directory.
```
npm install
``` 

3. Open the project folder in VS Code by clicking `File > Open Folder...`.
4. Open the terminal by clicking and run this commnad line 
```sh
npm init playwright@latest 
```
## Updating Playwright
---
1. Updae Node JS
```sh
npm i
```
2. Update playwright
```sh
npm install -D @playwright/test@latest
```
3. Check version
```sh
npx playwright --version
```

## Using Inspector
---

For better inspector run this command and click on any element to inspect it.
```
npx playwright codegen playwright.dev
```

## Command lines

---
<br/>
  <details>
    <summary>
      <strong> 👉 Click here to see the command lines
      </strong>
    </summary>

- Update packages 
```
npm i
```

- Check Playwright Current Version
```
npx @playwright/test --version
```
- Update Playwright to the latest version
```
npm install @playwright/test@latest
```
- Running All tests run this command 

```bash
npx playwright test
```

- Running the tests in headless mode run this command 
```bash
npx playwright test --headed
```

- Running a single test run this command 
```bash 
npx playwright test googleTest.spec.ts
```
- Running a set of test run this command 
```bash  
npx playwright tests/googleTests
```
 - Generating the report run this command 
``` bash 
npx playwright show-report reports/playwright-report
```
- Generate and serve a temporary allure report by running this command 
```bash 
allure serve reports/allure-results
```
- Generate and open report by running this command to generate the report 
```bash 
allure generate reports/allure-results -o allure-report --clean
```
  and then this command to open the report 
```bash
allure open allure-report
 ```

- Open the monocart-report -which provides a lightweight tree view for all your tests in a single file- by opening this file in your preferred browser `reports/monocart-report/report.html`.
- Open the native playwright-report by opening this file in your preferred browser `reports/playwright-report/index.html`.
- You can open the saved trace using Playwright CLI or in your browser on trace.playwright.dev.
``` bash
npx playwright show-trace path/trace.zip
```
- You can download the `trace.zip` file from any of the reports, or explore them manually under the `reports/test-artifacts/` directory. To open a playwright trace report you should use your preferred browser to navigating to [Playwright Trace Viewer](https://trace.playwright.dev/), and then drag/drop the trace archive file to open it.
  </details>
</br>

## Allure Report

---

<br/>
  <details>
    <summary>
      <strong> 👉 Steps to using allure report
      </strong>
    </summary>
    
- Step 1:  install the allure-playwright node package
```bash
npm i -D allure-playwright
```
- Step 2: Install the allure-commandline node package. Allure Commandline is a tool to generate Allure report from test results. Allure requires Java 8 or higher. To install, use the command:
```bash
npm i -D allure-commandline
```
- Step 3: Now to run the tests with allure-playwright reporter we will use the command:
```bash
npx playwright test --reporter=line, allure-playwright
```
- Step 4: Using the allure commandline we will now generate the allure report. To do that we will use the command:
```bash
npx allure generate ./allure-results --clean
```
- Step 5: Finally, we will open the HTML report on a browser using the command:
```bash
npx allure open ./allure-report
```
</details>
</br>  

### 🔆 Project structure

```
📦 Test Automation using Playwright
  ┣ 📂.github
  ┃ ┗ 📂workflows
  ┃ ┃ ┗ 📜CI.yml
  ┣ 📂src
  ┃ ┣ 📂lib
  ┃ ┃ ┣ 📜ApiActions.ts
  ┃ ┃ ┣ 📜BaseClas.ts
  ┃ ┃ ┣ 📜CustomeReporter.ts
  ┃ ┃ ┣ 📜DBActions.ts
  ┃ ┃ ┣ 📜FakerData.ts
  ┃ ┃ ┣ 📜FileActions.ts
  ┃ ┃ ┣ 📜Helper.ts
  ┃ ┃ ┣ 📜WebActions.ts
  ┃ ┣ 📂pages
  ┃ ┃ ┣ 📜googlePage.ts
  ┃ ┃ ┗ 📜monocartPage.ts
  ┣ 📂tests
  ┣ 📂utils
  ┃ ┣ 📂main
  ┃ ┃ ┣ 📂java
  ┃ ┃ ┃ ┗ 📂t
  ┃ ┃ ┃ ┃ ┗ 📂com

  ┣ 📜.gitignore
  ┣ 📜package-lock.json
  ┣ 📜package.json
  ┣ 📜playwright.config.json
  ┣ 📜README.md
  ┗ 📜tsconfig.xml
```
