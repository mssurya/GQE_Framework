import { APIRequestContext,request } from 'playwright';

export const setupRequestContext = async (baseURL: string, token: string): Promise<APIRequestContext> => {
    const requestContext = await request.newContext({
        baseURL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return requestContext;
};

export const handleResponse = (response: Response) => {
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    return response.json();
};