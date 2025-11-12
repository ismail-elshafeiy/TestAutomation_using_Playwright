import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { logInfo } from '../CustomReporter';
import { expandDotNotation } from '../utils/expandDotNotation';
import env from '@constants/env';

export interface CSVParseOptions {
  columns?: boolean;
  skip_empty_lines?: boolean;
  delimiter?: string;
  quote?: string;
  escape?: string;
  encoding?: BufferEncoding;
}

export type CSVRecord = Record<string, string | number | boolean>;

export class CSVFileManager {
  /**
   * Generic method to read and parse CSV files
   * @param filePath - Path to the CSV file (relative to project root)
   * @param options - CSV parsing options
   * @param transformFunction - Optional function to transform each record
   * @returns Array of parsed records
   */
  static readCSV<T = CSVRecord>(filePath: string, options: CSVParseOptions = {}, transformFunction?: (record: CSVRecord) => T): T[] {
    try {
      // Default options
      const defaultOptions: CSVParseOptions = {
        columns: true,
        skip_empty_lines: true,
        encoding: 'utf8',
        ...options,
      };
      logInfo(`Reading CSV file from: ${filePath}`);
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`CSV file not found: ${filePath}`);
      }

      // Read and parse CSV file
      const fileContent = fs.readFileSync(filePath, { encoding: defaultOptions.encoding });
      const csvRecords = parse(fileContent, defaultOptions) as CSVRecord[];

      logInfo(`Successfully parsed ${csvRecords.length} records from CSV`);

      // Apply transformation function if provided
      if (transformFunction) {
        const transformedRecords = csvRecords.map(transformFunction);
        logInfo(`Applied transformation function to ${transformedRecords.length} records`);
        return transformedRecords;
      }

      return csvRecords as T[];
    } catch (error) {
      const errorMessage = `Failed to read CSV file: ${filePath}. Error: ${error}`;
      logInfo(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Read CSV file with relative path from test directory
   * @param relativePath - Path relative to the test file location
   * @param options - CSV parsing options
   * @param transformFunction - Optional function to transform each record
   * @returns Array of parsed records
   */
  static readTestCSV<T = CSVRecord>(fullPath: string, options: CSVParseOptions = {}, transformFunction?: (record: CSVRecord) => T): T[] {
    return this.readCSV(fullPath, options, transformFunction);
  }

  /**
   * Read CSV file from data directory
   * @param fileName - CSV file name in the data directory
   * @param options - CSV parsing options
   * @param transformFunction - Optional function to transform each record
   * @returns Array of parsed records
   */
  static readDataCSV<T = CSVRecord>(fullPath: string, options: CSVParseOptions = {}, transformFunction?: (record: CSVRecord) => T): T[] {
    return this.readCSV(fullPath, options, transformFunction);
  }

  /**
   * Filter CSV records based on a condition
   * @param records - Array of records to filter
   * @param filterFunction - Function to filter records
   * @returns Filtered array of records
   */
  static filterRecords<T>(records: T[], filterFunction: (record: T) => boolean): T[] {
    const filteredRecords = records.filter(filterFunction);
    logInfo(`Filtered ${records.length} records to ${filteredRecords.length} records`);
    return filteredRecords;
  }

  /**
   * Get records marked for execution (run = 'yes')
   * Assumes records have a testcase.run property
   * @param records - Array of records with testcase.run property
   * @returns Array of records where run is 'yes'
   */
  static getExecutableRecords<T extends { testcase: { run: string } }>(records: T[]): T[] {
    return this.filterRecords(records, (record) => record.testcase.run.toLowerCase() === 'yes');
  }

  /**
   * Generic method to read CSV file and return only executable records
   * Combines readCSV + getExecutableRecords in one method
   * @param filePath - Path to the CSV file (relative to project root)
   * @param transformFunction - Function to transform each record
   * @param options - CSV parsing options (uses defaults if not provided)
   * @returns Array of executable records (where testcase.run = 'yes')
   */
  static getExecutableCSVRecords<T extends { testcase: { run: string } }>(filePath: string, transformFunction: (record: CSVRecord) => T, options: CSVParseOptions = {}): T[] {
    // Set default options for test CSV files
    const defaultOptions: CSVParseOptions = {
      columns: true,
      skip_empty_lines: true,
      ...options,
    };
    const allRecords = this.readCSV(filePath, defaultOptions, transformFunction);
    return this.getExecutableRecords(allRecords);
  }

  /**
   * Read test CSV file and return only executable records
   * @param relativePath - Path relative to the test file location
   * @param transformFunction - Function to transform each record
   * @param options - CSV parsing options (uses defaults if not provided)
   * @returns Array of executable records (where testcase.run = 'yes')
   */
  static getExecutableTestCSVRecords<T extends { testcase: { run: string } }>(relativePath: string, transformFunction: (record: CSVRecord) => T, options: CSVParseOptions = {}): T[] {
    const fullPath = `${relativePath}`;
    return this.getExecutableCSVRecords(fullPath, transformFunction, options);
  }

  /**
   * Read test CSV file and return only executable records using generic dot notation expansion
   * @param relativePath - Path relative to the test file location
   * @param options - CSV parsing options (uses defaults if not provided)
   * @returns Array of executable records with expanded dot notation
   */
  static getExecutableTestCSVWithDotNotation<T extends { testcase: { run: string } }>(relativePath: string, options: CSVParseOptions = {}): T[] {
    return this.getExecutableTestCSVRecords(relativePath, (record) => expandDotNotation<T>(record), options);
  }
}
