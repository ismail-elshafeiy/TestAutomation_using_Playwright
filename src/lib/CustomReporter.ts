import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestStep,
  TestError,
  TestResult,
} from '@playwright/test/reporter';
import { allure } from 'allure-playwright';
import * as fs from 'fs';
import * as path from 'path';
import envConfig from '../constants/envConfig';
import winston from 'winston';

const options = {
  level: 'info',
  format: winston.format.combine(winston.format.simple()),
  transports: [
    new winston.transports.File({
      filename: envConfig.logsFile,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
};
const console = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  handleExceptions: true,
});
const logger = winston.createLogger(options);
logger.add(console);
export default class CustomReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    removeReportHistory();
    logger.info(`Starting the run [ ${suite.allTests().length} ] test cases`);
    logger.info(`Running on [ ${config.workers} ] workers`);
    logger.info(`Parallel option : [ ${config.fullyParallel} ]`);
  }
  onTestBegin(test: TestCase) {
    logger.info(
      `===================================================================================================================================`,
    );
    logger.info(`Starting Test case : [ ${test.title} ] `);
    logger.info(
      `===================================================================================================================================`,
    );
  }
  onTestEnd(test: TestCase, result: TestResult) {
    logger.info(
      `===================================================================================================================================`,
    );
    logger.info(`Finished Test Case : [ ${test.title} ] => Status : [ ${result.status} ] `);
    logger.info(
      `===================================================================================================================================`,
    );
  }
  onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === `test.step` || step.category === `setup.step`) {
      logger.info(`Step : ${step.title}`);
    }
  }
  onError(error: TestError) {
    logger.error(`An error occurred : ${error.message}`);
  }
  onEnd(result: FullResult) {
    logger.info(`Finished the run: ${result.status}`);
    logger.info(`allure report : allure serve reports/allure-results`);
  }
}
const folderPath = path.join(envConfig.allureResults);

async function removeReportHistory(): Promise<void> {
  logger.info(`Removing the report history . . .`);
  logger.info(`Folder Path : ${folderPath}`);
  if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    logger.info(`Allure Report history removed`);
  } else {
    logger.info(`No allure report history found`);
  }
}

export function logInfo(message: string): void {
//allure.step(message, async () => {});
  logger.info(message);
}
export function logError(message: string): void {
 // allure.step(message, async () => {});
  logger.error(message);
}
export function logWarn(message: string): void {
  logger.warn(message);
}
export function logDebug(message: string): void {
  logger.debug(message);
}
export function logVerbose(message: string): void {
  logger.verbose(message);
}
