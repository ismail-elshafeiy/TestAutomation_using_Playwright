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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
  return undefined; // Return undefined if guid is not 'guid'
}