import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import Playwright from 'playwright'

let playwright: Playwright;
let requestContext: APIRequestContext;

test.beforeAll(async () => {
  playwright = await Playwright.create();
  requestContext = await playwright.request.newContext();
});

test('disposeResponseTest', async () => {
  // Request-1:
  const apiResponse: APIResponse = await requestContext.get('https://gorest.co.in/public/v2/users');
  const statusCode: number = apiResponse.status();
  console.log('response status code: ' + statusCode);
  expect(statusCode).toBe(200);
  expect(apiResponse.ok()).toBe(true);
  const statusResText: string = apiResponse.statusText();
  console.log(statusResText);

  console.log('----print api response with plain text----');
  console.log(await apiResponse.text());

  await apiResponse.dispose(); // will dispose only response body but status code, url, status text will remain same
  console.log('----print api response after dispose with plain text----');

  try {
    console.log(await apiResponse.text());
  } catch (e) {
    console.log('api response body is disposed');
  }

  const statusCode1: number = apiResponse.status();
  console.log('response status code after dispose: ' + statusCode1);

  const statusResText1: string = apiResponse.statusText();
  console.log(statusResText1);

  console.log('response url:' + apiResponse.url());

  // Request -2 :
  const apiResponse1: APIResponse = await requestContext.get('https://reqres.in/api/users/2');
  console.log('get response body for 2nd request:');
  console.log('status code:' + apiResponse1.status());
  console.log('repose body:' + await apiResponse1.text());

  // request context dispose:
  await requestContext.dispose();
  // console.log('response2 body:' + await apiResponse.text());
  console.log('response2 body:' + await apiResponse1.text());
});

test.afterAll(async () => {
  await playwright.close();
});