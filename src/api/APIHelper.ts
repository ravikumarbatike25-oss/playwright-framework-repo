import type { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private readonly request: APIRequestContext;
    private readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    // GET request
    async get(endpoint: string, headers?: Record<string, string>) {
        const response = await this.request.get(`${this.baseUrl}${endpoint}`, { headers : headers ?? {}});
        return {
            status: response.status(),
            body: await response.json()
        }

    }

    // POST request
    async post(endpoint: string, data: object, headers?: Record<string, string>) {
        const response = await this.request.post(`${this.baseUrl}${endpoint}`, {data : data, headers : headers ?? {}});
        
        return {
            status: response.status(),
            body: await response.json()
        }
    }
    // PUT request
    async put(endpoint: string, data: object, headers?: Record<string, string>) {
        const response = await this.request.put(`${this.baseUrl}${endpoint}`, { data : data, headers : headers ?? {}});

        return {
            status: response.status(),
            body: await response.json()
        }
    }
    // DELETE request
    async delete(endpoint: string, headers?: Record<string, string>) {
        const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {headers : headers ?? {}});

        return {
            status: response.status()
        }
    }
}