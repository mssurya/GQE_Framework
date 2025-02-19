import { test, expect, APIRequestContext, APIResponse, request } from '@playwright/test';

test.describe('Create User Test With JSON String', () => {
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
    // String json:
    const reqJsonBody = JSON.stringify({
      name: 'testingAPI',
      email: 'testpwapi1@gmail.com',
      gender: 'male',
      status: 'active'
    });

    // POST Call: create a user
    const apiPostResponse: APIResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
      },
      data: reqJsonBody
    });

    console.log(apiPostResponse.status());
    expect(apiPostResponse.status()).toBe(201);
    expect(apiPostResponse.statusText()).toBe('Created');

    const responseText = await apiPostResponse.text();
    console.log(responseText);

    const postJsonResponse = await apiPostResponse.json();
    console.log(JSON.stringify(postJsonResponse, null, 2));

    // capture id from the post json response:
    const userId = postJsonResponse.id;
    console.log('user id : ' + userId);

    // GET Call: Fetch the same user by id:
    console.log('===============get call response============');

    const apiGetResponse: APIResponse = await requestContext.get(`https://gorest.co.in/public/v2/users/${userId}`, {
      headers: {
        'Authorization': 'Bearer f4bd5cb99e27882658a2233c4ddd1e8a14f49788f92938580971a46439aa774f'
      }
    });

    expect(apiGetResponse.status()).toBe(200);
    expect(apiGetResponse.statusText()).toBe('OK');
    const getResponseText = await apiGetResponse.text();
    console.log(getResponseText);
    expect(getResponseText).toContain(userId);
    expect(getResponseText).toContain('testingAPI');
  });
});