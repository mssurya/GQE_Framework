import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios from 'axios';

let response: any;

Given('I have the user details', async function () {
  // You can set up any preconditions here if needed
});

When('I send a POST request to create the user', async function () {
  const url = 'https://reqres.in/api/users';
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    name: 'morpheus',
    job: 'leader',
  };

  response = await axios.post(url, data, { headers });
});

Then('the user should be created successfully', async function () {
  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('name', 'morpheus');
  expect(response.data).toHaveProperty('job', 'leader');
});