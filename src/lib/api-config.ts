/**
 * API Configuration
 * 
 * Centralized configuration for backend API communication.
 * This file manages the base URL for all API requests.
 * 
 * Environment Variables:
 * - NEXT_PUBLIC_API_URL: Backend API base URL
 *   - Development: http://localhost:4000
 *   - Production: https://medical-examination-assistant.vercel.app
 */

/**
 * Get the API base URL from environment variable
 * Falls back to localhost:4000 for development if not set
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Helper function to build complete API endpoint URLs
 * 
 * @param endpoint - API endpoint path (e.g., '/patient/123')
 * @returns Complete URL (e.g., 'http://localhost:4000/patient/123')
 * 
 * @example
 * ```typescript
 * const url = getApiUrl('/patient/123');
 * // Returns: 'http://localhost:4000/patient/123'
 * ```
 */
export function getApiUrl(endpoint: string): string {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Check if we're in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Check if we're in production mode
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * API configuration object
 * Useful for accessing multiple config values at once
 */
export const apiConfig = {
    baseUrl: API_BASE_URL,
    isDevelopment,
    isProduction,
    getUrl: getApiUrl,
} as const;
