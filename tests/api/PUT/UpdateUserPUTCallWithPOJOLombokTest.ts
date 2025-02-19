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

test.describe('Update User PUT Call With POJO Lombok Test', () => {
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

  test('updateUserTest', async () => {
    // create users object using builder pattern
    const users: Users = {
      name: 'Naveen Automation Labs',
      email: getRandomEmail(),
      gender: 'male',
      status: 'active'
    };

    // 1. POST: create a user
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

    const userId = actUser.id!;
    console.log('new user id is : ' + userId);

    // update status active to inactive
    users.status = 'inactive';
    users.name = 'Naveen Automation Playwright';

    console.log('---------------PUT CALL----------------');

    // 2. PUT Call - update user:
    const apiPUTResponse: APIResponse = await requestContext.put(`https://gorest.co.in/public/v2/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
      },
      data: users
    });

    console.log(apiPUTResponse.status() + ' : ' + apiPUTResponse.statusText());
    expect(apiPUTResponse.status()).toBe(200);

    const putResponseText = await apiPUTResponse.text();
    console.log('update user : ' + putResponseText);

    const actPutUser: Users = JSON.parse(putResponseText);
    expect(actPutUser.id).toBe(userId);
    expect(actPutUser.status).toBe(users.status);
    expect(actPutUser.name).toBe(users.name);

    console.log('---------------GET CALL----------------');

    // 3. Get the updated user with GET CALL:
    const apiGETResponse: APIResponse = await requestContext.get(`https://gorest.co.in/public/v2/users/${userId}`, {
      headers: {
        'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
      }
    });

    console.log(apiGETResponse.url());

    const statusCode = apiGETResponse.status();
    console.log('response status code: ' + statusCode);
    expect(statusCode).toBe(200);
    expect(apiGETResponse.ok()).toBe(true);

    const statusGETStatusText = apiGETResponse.statusText();
    console.log(statusGETStatusText);

    const getResponseText = await apiGETResponse.text();

    const actGETUser: Users = JSON.parse(getResponseText);
    expect(actGETUser.id).toBe(userId);
    expect(actGETUser.status).toBe(users.status);
    expect(actGETUser.name).toBe(users.name);
  });
});