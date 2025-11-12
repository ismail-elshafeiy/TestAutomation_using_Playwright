import env from '@constants/env';
import { Page } from '@playwright/test';
import chalk from 'chalk';

export function formatNum(num: number): string {
  if (num >= 1 && num <= 9) {
    return '0' + num.toString();
  } else {
    return num.toString();
  }
}

export function replaceAllSpecialChar(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export function reverseString(value: string): string {
  return value.split('').reverse().join('');
}

export function getDate(
  format: 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'dd-mm-yyyy' | 'yyyy-mm-dd',
  flag: 'future' | 'past' | 'current',
  days?: number,
): string {
  // Get the current date
  const currentDate = new Date();

  // Add or subtract days based on the flag
  if (flag === 'future') {
    currentDate.setDate(currentDate.getDate() + (days || 0));
  } else if (flag === 'past') {
    currentDate.setDate(currentDate.getDate() - (days || 0));
  } else {
    currentDate.setDate(currentDate.getDate());
  }

  // Format the date to 'dd/MM/yyyy'
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = currentDate.getFullYear();

  // Return the formatted date based on the provided format
  switch (format) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy/mm/dd':
      return `${year}/${month}/${day}`;
    case 'dd-mm-yyyy':
      return `${day}-${month}-${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    default:
      throw new Error('Invalid date format');
  }
}
export async function getCurrentTime(): Promise<number> {
  const date = new Date();
  return date.getDate();
}

export function generateGUID(guid: string): string | undefined {
  if (guid === 'guid') {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  return undefined; // Return undefined if guid is not 'guid'
}
export const color = {
  success: chalk.bold.hex('#0EF15D'),
  error: chalk.bold.hex('#E4271B'),
  warning: chalk.bold.hex('#FFA500'),
  info: chalk.hex('#A020F0'),
  outgoingRequest: chalk.hex('#0560fc'),
  incomingRequest: chalk.hex('#fcf805'),
  request: chalk.hex('#0560fc'),
  response: chalk.hex('#fcf805'),
};

export async function logger(page: Page) {
  page.on('request', (request) => console.log(color.outgoingRequest('>>', request.method(), request.url())));
  page.on('response', (response) => console.log(color.incomingRequest('<<', response.status(), response.url())));
  page.on('console', (msg) => {
    if (msg.type() == 'error') {
      console.log(color.error(msg.text));
    }
  });
}
export async function getBaseURL(isApis: boolean): Promise<string> {
  const envSelected = env.env;
  if (isApis) {
    switch (envSelected) {
      case 'dev':
        return env.devApi;
      case 'qa':
        return env.qaApi;
      case 'prod':
        return env.prodApi;
      default:
        throw new Error(`Unknown environment: ${envSelected}`);
    }
  } else {
    switch (envSelected) {
      case 'dev':
        return env.dev;
      case 'qa':
        return env.qa;
      case 'prod':
        return env.prod;
      default:
        throw new Error(`Unknown environment: ${envSelected}`);
    }
  }
}
