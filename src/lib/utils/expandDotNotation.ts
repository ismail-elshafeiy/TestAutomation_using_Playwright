/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Generic utility to expand dot notation keys into nested objects
 * Converts flat keys like "patient.name" into nested objects { patient: { name: value } }
 *
 * @param record - The flat record with dot notation keys
 * @returns Transformed object with nested structure
 *
 * @example
 * const input = { "patient.name": "John", "patient.age": 30, "doctor": "Dr. Smith" };
 * const output = expandDotNotation(input);
 * Result: { patient: { name: "John", age: 30 }, doctor: "Dr. Smith" }
 */
export function expandDotNotation<T = any>(record: Record<string, any>): T {
  const transformed: any = {};

  for (const key in record) {
    if (key.includes('.')) {
      const [outerKey, innerKey] = key.split('.');
      transformed[outerKey] = transformed[outerKey] || {};
      transformed[outerKey][innerKey] = record[key];
    } else {
      transformed[key] = record[key];
    }
  }

  return transformed as T;
}

/**
 * Generic transform function specifically for test data with dot notation
 * Can be used with any interface type
 *
 * @param record - The flat record to transform
 * @returns Transformed record of type T
 */
export function transformRecord<T = any>(record: Record<string, any>): T {
  return expandDotNotation<T>(record);
}
