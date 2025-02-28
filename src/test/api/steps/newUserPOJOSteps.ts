import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios from 'axios';

class User {
  name: string;
  job: string;

  constructor(name: string, job: string) {
    this.name = name;
    this.job = job;
  }
}

let response: any;
let user: User;

Given('I have the new user details', async function () {
  user = new User('morpheus', 'leader');
});

When('I send a POST request to create the new user', async function () {
  const url = 'https://reqres.in/api/users';
  const headers = {
    'Content-Type': 'application/json',
  };

  response = await axios.post(url, user, { headers });
});

Then('the new user should be created successfully with status 201', async function () {
  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('name', user.name);
  expect(response.data).toHaveProperty('job', user.job);
});