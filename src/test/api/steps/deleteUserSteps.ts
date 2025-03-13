import { When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../../../../data/User';
import { Users } from '../../../../data/Users';

let requestContext: APIRequestContext;
let apiPostResponse: APIResponse;
let apiDeleteResponse: APIResponse;
let apiGetResponse: APIResponse;
let emailId: string;
let userId: string;
let users: Users;
let actUser: User;

Then('the JSON response should contain the user ID', async () => {
  const responseText = await apiPostResponse.text();
  actUser = JSON.parse(responseText);
  userId = actUser.id;
  expect(userId).toBeDefined();
});

When('I delete the user by ID', async () => {
  apiDeleteResponse = await requestContext.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
    }
  });
});

Then('the delete response status should be {int}', async (statusCode: number) => {
  expect(apiDeleteResponse.status()).toBe(statusCode);
});

Then('the response should contain {string}', async (message: string) => {
  const getResponseText = await apiGetResponse.text();
  expect(getResponseText).toContain(message);
});