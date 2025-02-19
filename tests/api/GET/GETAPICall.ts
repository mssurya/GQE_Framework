import { test, expect, APIRequestContext, APIResponse, request } from '@playwright/test';

test.describe('GET API Call Tests', () => {
  let requestContext: APIRequestContext;

  test.beforeAll(async () => {
    requestContext = await request.newContext();
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  test('getSpecificUserApiTest', async () => {
    const apiResponse: APIResponse = await requestContext.get('https://gorest.co.in/public/v2/users', {
      params: {
        gender: 'male',
        status: 'active'
      }
    });
    const statusCode = apiResponse.status();
    console.log('response status code: ' + statusCode);
    expect(statusCode).toBe(200);
    expect(apiResponse.ok()).toBe(true);

    const statusResText = apiResponse.statusText();
    console.log(statusResText);

    console.log('----print api response with plain text----');
    console.log(await apiResponse.text());

    console.log('----print api json response----');
    const jsonResponse = await apiResponse.json();
    const jsonPrettyResponse = JSON.stringify(jsonResponse, null, 2);
    console.log(jsonPrettyResponse);
  });

  test('getUsersApiTest', async () => {
    const apiResponse: APIResponse = await requestContext.get('https://gorest.co.in/public/v2/users');
    const statusCode = apiResponse.status();
    console.log('response status code: ' + statusCode);
    expect(statusCode).toBe(200);
    expect(apiResponse.ok()).toBe(true);

    const statusResText = apiResponse.statusText();
    console.log(statusResText);

    console.log('----print api response with plain text----');
    console.log(await apiResponse.text());

    console.log('----print api json response----');
    const jsonResponse = await apiResponse.json();
    const jsonPrettyResponse = JSON.stringify(jsonResponse, null, 2);
    console.log(jsonPrettyResponse);

    console.log('----print api url----');
    console.log(apiResponse.url());

    console.log('----print response headers----');
    const headersMap = apiResponse.headers();
    console.log(headersMap);
    expect(headersMap['content-type']).toBe('application/json; charset=utf-8');
    expect(headersMap['x-download-options']).toBe('noopen');
  });
});