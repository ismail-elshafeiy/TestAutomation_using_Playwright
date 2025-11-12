import fs from 'fs';
import { request, Page, APIResponse, Response, expect } from '@playwright/test';
import { step, attachment } from 'allure-js-commons';
import { logInfo } from '../CustomReporter';
import { getBaseURL } from '@lib/utils/Helper';

export class APIActions {
  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response, `200 Status code was not displayed.`).toBeOK();
  }

  async verifyResponseBody(
    expectedResponseBodyParams: string,
    responsePart: JSON,
    responseType: string,
  ): Promise<void> {
    let status = true;
    let fieldNames = `Parameter`;
    const headers = expectedResponseBodyParams.split('|');
    const responseToString = JSON.stringify(responsePart).trim();
    for (let headerKey of headers) {
      if (!responseToString.includes(headerKey.trim())) {
        status = false;
        fieldNames = fieldNames + `, ` + headerKey;
        break;
      }
    }
    expect(status, `${fieldNames} was not present in ${responseType}`).toBe(true);
  }

  async verifyResponseHeader(
    expectedResponseHeaderParams: string,
    responsePart: Array<{ name: string; value: string }>,
    responseType: string,
  ): Promise<void> {
    let status = true;
    let fieldNames = `Parameter`;
    for (let responseKey of responsePart) {
      if (!expectedResponseHeaderParams.includes(responseKey.name.trim())) {
        status = false;
        fieldNames = fieldNames + ' ,' + responseKey.name;
        break;
      }
    }
    expect(status, `${fieldNames} was not present in ${responseType}`).toBe(true);
  }

  async readValuesFromTextFile(fileName: string): Promise<string> {
    return fs.readFileSync(`./utils/api/${fileName}.txt`, `utf8`);
  }
}
export async function getOperationResponse(page: Page, operation: string): Promise<Response> {
  const baseURL = await getBaseURL(true);
  const response = await page.waitForResponse((resp) => {
    if (!resp.url().includes(baseURL)) return false;
    try {
      const request = resp.request().postDataJSON();
      return request.operationName === operation;
    } catch {
      return false;
    }
  });
  // await allure.attachment(`${operation} - Response`, await response.text(), 'text/plain');
  // console.log('Response Body:', response.json());
  await logResponse(response, operation);
  return response;
}

export async function logResponse(response: APIResponse | Response, APIName: string) {
  const separator = '='.repeat(150);
  const statusEmoji =
    response.status() >= 200 && response.status() < 300 ? '✅' : response.status() >= 400 ? '❌' : '⚠️';

  logInfo(`${separator}`);
  logInfo(`${statusEmoji} API Response: [ ${APIName} ] - Status: [ ${response.status()} ${response.statusText()} ]`);
  logInfo(`${separator}`);

  try {
    const json = await response.json();
    logInfo(`📥 Response Body (JSON):`);
    logInfo(JSON.stringify(json, null, 2));
    await attachment(`${APIName} - Response`, JSON.stringify(json.data ?? json, null, 2), 'text/plain');
  } catch {
    const textResponse = await response.text();
    logInfo(`📥 Response Body (Text):`);
    logInfo(textResponse);
    await attachment(`${APIName} - Response`, textResponse, 'text/plain');
  }

  logInfo(`${separator}\n`);
}
