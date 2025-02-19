import { test, expect, APIRequestContext, APIResponse, request } from '@playwright/test';

test.describe('API Response Headers Test', () => {
  let requestContext: APIRequestContext;

  test.beforeAll(async () => {
    requestContext = await request.newContext();
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  test('getHeadersTest', async () => {
    const apiResponse: APIResponse = await requestContext.get('https://gorest.co.in/public/v2/users');
    const statusCode = apiResponse.status();
    console.log('response status code: ' + statusCode);
    expect(statusCode).toBe(200);

    // using map:
    const headersMap = apiResponse.headers();
    for (const [key, value] of Object.entries(headersMap)) {
      console.log(`${key}: ${value}`);
    }
    console.log('total response headers: ' + Object.keys(headersMap).length);
    expect(headersMap['server']).toBe('cloudflare');
    expect(headersMap['content-type']).toBe('application/json; charset=utf-8');

    console.log('===============================');

    // using list:
    const headersList = apiResponse.headersArray();
    headersList.forEach(header => {
      console.log(`${header.name} : ${header.value}`);
    });
  });
});