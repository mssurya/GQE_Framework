import { When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, APIResponse, request } from '@playwright/test';
import { User } from '../../../../data/User';
import { Users } from '../../../../data/Users';

let requestContext: APIRequestContext;
let apiPostResponse: APIResponse;
let apiPUTResponse: APIResponse;
let apiGETResponse: APIResponse;
let emailId: string;
let userId: string;
let users: Users;
let actUser: User;

When('I update the user status to inactive and name to {string}', async (newName: string) => {
  users.status = 'inactive';
  users.name = newName;

  apiPUTResponse = await requestContext.put(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
    },
    data: users
  });
});

Then('the update response status should be {int}', async (statusCode: number) => {
  expect(apiPUTResponse.status()).toBe(statusCode);
});

When('I fetch the updated user by ID', async () => {
  apiGETResponse = await requestContext.get(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
    }
  });
});

Then('the response status should be {int}', async (statusCode: number) => {
  expect(apiGETResponse.status()).toBe(statusCode);
});

Then('the response status text should be {string}', async (statusText: string) => {
  expect(apiGETResponse.statusText()).toBe(statusText);
});

Then('the response should contain the updated user details', async () => {
  const getResponseText = await apiGETResponse.text();
  const actGETUser: Users = JSON.parse(getResponseText);

//   expect(actGETUser.email).toBe(users.email);
  expect(actGETUser.status).toBe(users.status);
  expect(actGETUser.name).toBe(users.name);
});