import { test, expect, APIRequestContext, APIResponse, request } from '@playwright/test';

interface User {
  id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

test.describe('Create User Post Call With POJO Test', () => {
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
    // create user object
    const user: User = {
      name: 'Naveen',
      email: getRandomEmail(),
      gender: 'male',
      status: 'active'
    };

    // POST Call: create a user
    const apiPostResponse: APIResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
      },
      data: user
    });

    console.log(apiPostResponse.status());
    expect(apiPostResponse.status()).toBe(201);
    expect(apiPostResponse.statusText()).toBe('Created');

    const responseText = await apiPostResponse.text();
    console.log(responseText);

    // convert response text/json to POJO -- deserialization
    const actUser: User = JSON.parse(responseText);
    console.log('actual user from the response---->');
    console.log(actUser);

    expect(actUser.name).toBe(user.name);
    expect(actUser.email).toBe(user.email);
    expect(actUser.status).toBe(user.status);
    expect(actUser.gender).toBe(user.gender);
    expect(actUser.id).not.toBeNull();
  });
});