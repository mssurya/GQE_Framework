import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, APIRequestContext, APIResponse, request } from '@playwright/test';

let requestContext: APIRequestContext;
let apiPostResponse: APIResponse;
let apiGetResponse: APIResponse;
let emailId: string;
let userId: string;
let user: User;
let users: Users;
let actUser: User;

interface User {
    id?: string;
    name: string;
    email: string;
    gender: string;
    status: string;
  }
  
  interface Users {
    name: string;
    email: string;
    gender: string;
    status: string;
  }
  

Before(async () => {
  requestContext = await request.newContext();
});

After(async () => {
  await requestContext.dispose();
});

function getRandomEmail(): string {
  emailId = `testpwautomation${Date.now()}@gmail.com`;
  return emailId;
}

Given('a new API request context is created', async () => {
  // Context is already created in Before hook
});

When('I create a new user with random email', async () => {
  const data = {
    name: 'PlayWrightDemo',
    email: getRandomEmail(),
    gender: 'male',
    status: 'active'
  };

  apiPostResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
    },
    data
  });
});

Then('the response should contain the user ID', async () => {
  const postJsonResponse = await apiPostResponse.json();
  userId = postJsonResponse.id;
  expect(userId).toBeDefined();
});

Then('the response should contain the user name {string}', async (userName: string) => {
  const postJsonResponse = await apiPostResponse.json();
  expect(postJsonResponse.name).toBe(userName);
});

Then('the response should contain the user email', async () => {
  const postJsonResponse = await apiPostResponse.json();
  expect(postJsonResponse.email).toBe(emailId);
});

When('I fetch the user by ID', async () => {
  apiGetResponse = await requestContext.get(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
    }
  });
});

When('I create a new user using POJO with random email', async () => {
  user = {
    name: 'PlaywrightDemo',
    email: getRandomEmail(),
    gender: 'male',
    status: 'active'
  };

  apiPostResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
    },
    data: user
  });
});

Then('the response should contain the user details', async () => {
  const responseText = await apiPostResponse.text();
  actUser = JSON.parse(responseText);

  expect(actUser.name).toBe(user.name);
  expect(actUser.email).toBe(user.email);
  expect(actUser.status).toBe(user.status);
  expect(actUser.gender).toBe(user.gender);
  expect(actUser.id).not.toBeNull();
});

When('I create a new user with random email using builder pattern', async () => {
  users = {
    name: 'PlayWrightDemo',
    email: getRandomEmail(),
    gender: 'male',
    status: 'active'
  };

  apiPostResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
    },
    data: users
  });
});

When('I create a new user with JSON string', async () => {
    const reqJsonBody = JSON.stringify({
      name: 'testingAPI',
      email: getRandomEmail(),
      gender: 'male',
      status: 'active'
    });
  
    apiPostResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
      },
      data: reqJsonBody
    });
  });
  