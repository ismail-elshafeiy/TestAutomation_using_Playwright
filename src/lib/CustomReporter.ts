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
import * as fs from 'fs';
import envConfig from 'src/constants/env';
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
const consoleTransport = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  handleExceptions: true,
  stderrLevels: [], // Force all levels to stdout to ensure visibility
});

// Create logger with both file and console transports
const logger = winston.createLogger({
  ...options,
  transports: [...options.transports, consoleTransport],
});
export default class CustomReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    removeReportHistory();
    logger.info(`Starting the run [ ${suite.allTests().length} ] test cases`);
    logger.info(`Running on [ ${config.workers} ] workers`);
    logger.info(`Parallel option : [ ${config.fullyParallel} ]`);
  }
  onTestBegin(test: TestCase) {
    logger.info(`🚀 ${'='.repeat(150)} 🚀 `);
    logger.info(`🧪 Starting Test : [ ${test.title} ]`);
    logger.info(`📁 File : ${test.location.file}:${test.location.line}`);
    logger.info(`📄 Name : ${test.location.file.split('/').pop()}:${test.location.line}`);
    logger.info(`🚀 ${'='.repeat(150)} 🚀 `);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const statusEmoji = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⚠️';
    const duration = result.duration ? ` in ${result.duration}ms` : '';
    logger.info(`${'='.repeat(150)}`);
    logger.info(
      `${statusEmoji} Finished Test : [ ${test.title} ] => Status : [ ${result.status.toUpperCase()} ]${duration}`,
    );
    if (result.status === 'failed' && result.error) {
      logger.error(`💥 Error: ${result.error.message}`);
    }
    logger.info(`${'='.repeat(150)}\n`);
  }
  onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
    // Handle main test steps with clean formatting
    if (
      step.category === `test.step` ||
      step.category === `setup.step` ||
      step.category === `allure.step` ||
      step.category === `step`
    ) {
      const stepPrefix = step.category === 'setup.step' ? '🔧' : '🎯';
      const indentation = '  '.repeat(step.parent ? 1 : 0);
      logger.info(`${indentation}${stepPrefix} ${step.title}`);
    }
    // Handle Playwright actions - only show meaningful ones (skip hooks and fixtures)
    else if (
      step.title &&
      !step.category.includes('expect') &&
      !step.category.includes('hook') &&
      !step.category.includes('fixture') &&
      !step.title.includes('Attach') &&
      !step.title.includes('Fixture') &&
      !step.title.includes('Before Hooks') &&
      !step.title.includes('After Hooks')
    ) {
      const shouldLog = this.shouldLogAction(step.title, step.duration || 0);
      if (shouldLog) {
        const actionType = this.getActionEmoji(step.title);
        const shortTitle = this.shortenActionTitle(step.title);
        logger.info(`    ${actionType} ${shortTitle}`);
      }
    }
  }

  // Helper method to show complete action titles - NO TRUNCATION
  private shortenActionTitle(title: string): string {
    return title;
  } // Helper method to determine if action should be logged (reduce noise)
  private shouldLogAction(title: string, duration: number): boolean {
    // Always log slow actions (>500ms)
    if (duration > 500) return true;

    // Skip very fast system actions
    if (
      duration < 50 &&
      (title.includes('Wait for load state') || title.includes('Get storage state') || title.includes('Fixture'))
    ) {
      return false;
    }

    // Skip attachment actions
    if (title.includes('Attach')) return false;

    // Log important user actions
    if (
      title.includes('Click') ||
      title.includes('Fill') ||
      title.includes('Type') ||
      title.includes('Press') ||
      title.includes('Navigate')
    ) {
      return true;
    }

    return false;
  }

  // Helper method to get appropriate emoji for actions
  private getActionEmoji(title: string): string {
    if (title.includes('Click')) return '👆';
    if (title.includes('Fill') || title.includes('Type') || title.includes('Enter')) return '✏️';
    if (title.includes('Navigate')) return '🌐';
    if (title.includes('Wait')) return '⏳';
    if (title.includes('Press')) return '⌨️';
    if (title.includes('Clear')) return '🧹';
    return '📋';
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    // Only log completion for main steps or failures
    if (
      step.category === `test.step` ||
      step.category === `setup.step` ||
      step.category === `allure.step` ||
      step.category === `step`
    ) {
      const duration = step.duration ? ` (${step.duration}ms)` : '';
      const indentation = '  '.repeat(step.parent ? 1 : 0);

      // Only log if failed or took longer than 2 seconds
      if (step.error) {
        logger.error(`${indentation}❌ Failed: ${step.title}${duration}`);
        logger.error(`${indentation}   Error: ${step.error.message}`);
      } else if (step.duration && step.duration > 2000) {
        logger.info(`${indentation}⚡ Slow: ${step.title}${duration}`);
      }
    }
  }
  onError(error: TestError) {
    logger.error(`An error occurred : ${error.message}`);
  }
  onEnd(result: FullResult) {
    logger.info(`Finished the run: ${result.status}`);
    // Generate Allure HTML report if results exist
    const allureResultsPath = 'allure-results';
    const allureReportPath = 'reports/allure-report';
    if (fs.existsSync(allureResultsPath)) {
      logger.info(`📊 Generating Allure HTML report...`);
      logger.info(`📊 Results: ${allureResultsPath}`);
      logger.info(`📊 Report: ${allureReportPath}`);
      logger.info(`📊 Commands:`);
      logger.info(`   Generate: npx allure generate ${envConfig.allureResults} --output reports/allure-report --clean`);
      logger.info(`   Serve: npx allure serve ${envConfig.allureResults}`);
    } else {
      logger.info(`⚠️  No allure results found at: ${allureResultsPath}`);
    }
  }
}
const folderPath = 'allure-results';

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

// Helper function to safely execute allure steps
// Only calls allure step if we're in a test context, otherwise just logs
function safeAllureStep(message: string, logFunction: () => void): void {
  // Just execute the log function directly without allure step
  logFunction();
}
export function logConsole(message: string): void {
  logger.info(message);
}
export function logInfo(message: string): void {
  logger.info(message);
}
export function logError(message: string): void {
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
