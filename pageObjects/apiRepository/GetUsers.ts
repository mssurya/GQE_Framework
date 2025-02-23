import { APIRequestContext, APIResponse } from '@playwright/test';

export class GetUsers {
  readonly requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async getSpecificUser(gender: string, status: string): Promise<APIResponse> {
    return this.requestContext.get('https://gorest.co.in/public/v2/users', {
      params: { gender, status }
    });
  }

  async getUsers(): Promise<APIResponse> {
    return this.requestContext.get('https://gorest.co.in/public/v2/users');
  }
}