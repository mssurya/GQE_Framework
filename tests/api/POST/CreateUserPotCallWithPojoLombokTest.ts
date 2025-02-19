import { test, expect, APIRequestContext, APIResponse, request } from '@playwright/test';

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

test.describe('Create User Post Call With POJO Lombok Test', () => {
  let requestContext: APIRequestContext;
  let emailId: string;

  test.beforeAll(async () => {
    requestContext = await request.newContext();
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  function getRandomEmail(): string {
    emailId = `testpwautomation${Date.now()}@gmail.com`;
    return emailId;
  }

  test('createUserTest', async () => {
    // create users object using builder pattern
    const users: Users = {
      name: 'Naveen Automation',
      email: getRandomEmail(),
      gender: 'male',
      status: 'active'
    };

    // POST Call: create a user
    const apiPostResponse: APIResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
      },
      data: users
    });

    console.log(apiPostResponse.url());
    expect(apiPostResponse.status()).toBe(201);
    expect(apiPostResponse.statusText()).toBe('Created');

    const responseText = await apiPostResponse.text();
    console.log(responseText);

    // convert response text/json to POJO -- deserialization
    const actUser: User = JSON.parse(responseText);
    console.log('actual user from the response---->');
    console.log(actUser);

    expect(actUser.name).toBe(users.name);
    expect(actUser.email).toBe(users.email);
    expect(actUser.status).toBe(users.status);
    expect(actUser.gender).toBe(users.gender);
    expect(actUser.id).not.toBeNull();
  });
});