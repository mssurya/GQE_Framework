import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, request, APIResponse } from '@playwright/test';
import { GetUsers } from '../../../../pageObjects/apiRepository/GetUsers';
import { APIActions } from '../../../../lib/APIActions';

let requestContext: APIRequestContext;
let getUsers: GetUsers;
let apiResponse: APIResponse;
let apiResponse1: APIResponse;
let apiActions: APIActions;

apiActions = new APIActions();

Given('I have a request context', async function () {
  requestContext = await request.newContext();
  getUsers = new GetUsers(requestContext);
});

When('I send a request to get a specific user with gender {string} and status {string}', async function (gender: string, status: string) {
  apiResponse = await getUsers.getSpecificUser(gender, status);
});

When('I send a request to get all users', async function () {
  apiResponse = await getUsers.getUsers();
});

Then('the response status code should be {int}', async function (statusCode: number) {
    await apiActions.verifyStatusCode(apiResponse);
  });
  
Then('the response should be OK', async function () {
    expect(apiResponse.ok()).toBe(true);
  });


Then('print the response details', async function () {
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

Given('I have a request context with token', async function () {
  requestContext = await request.newContext({
    extraHTTPHeaders: {
      'Authorization': 'Your App Token'
    }
  });
});

When('I send a request to get users', async function () {
  apiResponse = await requestContext.get('/api/users?per_page=1');
});

When('I send a request to get users with token', async function () {
  apiResponse = await requestContext.get('/api/users?per_page=1');
});

Then('the response body should contain expected parameters', async function () {
  const responseBodyParams = (await apiActions.readValuesFromTextFile('getUsers')).split('#')[0];
  await apiActions.verifyResponseBody(responseBodyParams, await apiResponse.json(), 'Response Body');
});

Then('the response headers should contain expected parameters', async function () {
  const responseBodyHeaders = (await apiActions.readValuesFromTextFile('getUsers')).split('#')[1];
  await apiActions.verifyResponseHeader(responseBodyHeaders, apiResponse.headersArray(), 'Response Headers');
});

Given('a request to the users endpoint', async () => {
  apiResponse = await requestContext.get('https://gorest.co.in/public/v2/users');
});

When('the response is received', async () => {
  const statusCode: number = apiResponse.status();
  console.log('response status code: ' + statusCode);
  expect(statusCode).toBe(200);
  expect(apiResponse.ok()).toBe(true);
  const statusResText: string = apiResponse.statusText();
  console.log(statusResText);

  console.log('----print api response with plain text----');
  console.log(await apiResponse.text());
});

Then('the response body is disposed', async () => {
  await apiResponse.dispose();
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
});

Given('a request to the specific user endpoint', async () => {
  apiResponse1 = await requestContext.get('https://reqres.in/api/users/2');
});

When('the second response is received', async () => {
  console.log('get response body for 2nd request:');
  console.log('status code:' + apiResponse1.status());
  console.log('response body:' + await apiResponse1.text());
});

Then('the specific user response body is also disposed', async () => {
    await apiResponse1.dispose();
    console.log('----print api response after dispose with plain text----');
  
    try {
      console.log(await apiResponse1.text());
    } catch (e) {
      console.log('api response body is disposed');
    }
  
    const statusCode1: number = apiResponse1.status();
    console.log('response status code after dispose: ' + statusCode1);
  
    const statusResText1: string = apiResponse1.statusText();
    console.log(statusResText1);
  
    console.log('response url:' + apiResponse1.url());
  });


// BeforeAll(async () => {
//   playwright = chromium;
//   requestContext = await request.newContext();
// });


// AfterAll(async () => {
//   await requestContext.dispose();
// });