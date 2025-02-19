import { test, expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { User } from '../../../data/User';
import { Users } from '../../../data/Users';

let requestContext: APIRequestContext;

const getRandomEmail = (): string => {
    return `testpwautomation${Date.now()}@gmail.com`;
};

test.beforeAll(async ({ request }) => {
    requestContext = request;
});

test('delete user test', async () => {
    // 1. Create users object using builder pattern
    const users: Users = {
        name: "PlayWright PracticeUser",
        email: getRandomEmail(),
        gender: "male",
        status: "active"
    };

    // POST Call: create a user
    const apiPostResponse = await requestContext.post('https://gorest.co.in/public/v2/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
        },
        data: users
    });

    console.log(apiPostResponse.url());
    console.log(apiPostResponse.status());
    expect(apiPostResponse.status()).toBe(201);

    const responseText = await apiPostResponse.text();
    console.log(responseText);

    // Deserialize response text to User object
    const actUser: User = JSON.parse(responseText);
    console.log("Actual user from the response---->", actUser);

    expect(actUser.id).not.toBeNull();

    const userId = actUser.id;
    console.log("New user id is: " + userId);

    // 2. Delete user
    const apiDeleteResponse = await requestContext.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
            'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
        }
    });

    console.log(apiDeleteResponse.status());
    console.log(apiDeleteResponse.statusText());

    expect(apiDeleteResponse.status()).toBe(204);

    console.log("Delete user response body ====" + await apiDeleteResponse.text());

    // 3. Get user to verify deletion
    const apiResponse = await requestContext.get(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
            'Authorization': 'Bearer e4b8e1f593dc4a731a153c5ec8cc9b8bbb583ae964ce650a741113091b4e2ac6'
        }
    });

    console.log(await apiResponse.text());

    const statusCode = apiResponse.status();
    console.log("Response status code: " + statusCode);
    expect(statusCode).toBe(404);
    expect(apiResponse.statusText()).toBe("Not Found");

    expect(await apiResponse.text()).toContain("Resource not found");
});