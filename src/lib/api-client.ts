/**
 * API Client for NestJS Backend
 * 
 * Centralized HTTP client for making requests to the NestJS backend.
 * This provides a consistent interface for all API calls with:
 * - Error handling
 * - Request/response interceptors  
 * - Type safety
 * - Automatic JSON parsing
 */

import { getApiUrl } from './api-config';

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public error?: string
    ) {
        super(message);
        this.name = 'ApiClientError';
    }
}

/**
 * HTTP request options with query parameters support
 */
export interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

/**
 * Build query string from params object
 * 
 * @example
 * buildQueryString({ page: 1, limit: 10 }) => "?page=1&limit=10"
 */
function buildQueryString(params: Record<string, string | number | boolean>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Base request function - wraps fetch() with error handling
 */
async function request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { params, headers, ...fetchOptions } = options;

    // Build full URL with query parameters
    const queryString = params ? buildQueryString(params) : '';
    const url = getApiUrl(endpoint) + queryString;

    // Default headers
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers: {
                ...defaultHeaders,
                ...headers,
            },
        });

        // Parse response
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        // Handle errors
        if (!response.ok) {
            const errorMessage = data?.message || data?.error || 'An error occurred';
            throw new ApiClientError(response.status, errorMessage, data?.error);
        }

        return data;
    } catch (error) {
        if (error instanceof ApiClientError) throw error;
        if (error instanceof TypeError) {
            throw new ApiClientError(0, 'Network error: Unable to connect to server');
        }
        throw new ApiClientError(500, error instanceof Error ? error.message : 'Unknown error');
    }
}

// HTTP Method Helpers

export async function get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'GET' });
}

export async function post<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'POST' });
}

export async function put<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'PUT' });
}

export async function patch<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'PATCH' });
}

export async function del<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
}

/**
 * POST with FormData (for file uploads)
 * Note: Don't set Content-Type - browser sets it automatically with boundary
 */
export async function postFormData<T = any>(
    endpoint: string,
    formData: FormData,
    options: RequestOptions = {}
): Promise<T> {
    const { headers, ...restOptions } = options;
    const url = getApiUrl(endpoint);

    try {
        const response = await fetch(url, {
            ...restOptions,
            method: 'POST',
            body: formData,
            // Don't set Content-Type for FormData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new ApiClientError(response.status, data?.message || 'Upload failed');
        }
        return data;
    } catch (error) {
        if (error instanceof ApiClientError) throw error;
        throw new ApiClientError(500, error instanceof Error ? error.message : 'Upload error');
    }
}

/**
 * Main API Client Export
 * Use this in your components
 * 
 * @example
 * ```typescript
 * // GET request
 * const patients = await apiClient.get('/patient', { 
 *   params: { page: 1, limit: 10 } 
 * });
 * 
 * // POST request
 * const result = await apiClient.post('/patient', {
 *   body: JSON.stringify({ name: 'John' })
 * });
 * 
 * // File upload
 * const formData = new FormData();
 * formData.append('file', audioFile);
 * const result = await apiClient.postFormData('/stt', formData);
 * ```
 */
export const apiClient = {
    get,
    post,
    put,
    patch,
    delete: del,
    postFormData,

    // Legacy specific methods (kept for backward compatibility)
    async analyze(transcript: string) {
        return post('/analyze', {
            body: JSON.stringify({ transcript }),
        });
    },

    async transcribeAudio(audioFile: File) {
        const formData = new FormData();
        formData.append('audio', audioFile);
        return postFormData('/stt', formData);
    },

    async submitComparison(aiResults: any, doctorResults: any) {
        return post('/comparison', {
            body: JSON.stringify({ aiResults, doctorResults }),
        });
    },
};