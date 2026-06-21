/**
 * Centralized API Client using Native Fetch
 * 
 * In Next.js 14/15, the native `fetch` API is heavily optimized (caching, memoization, revalidation).
 * Therefore, using `fetch` over `axios` is generally considered the best practice for Next.js App Router applications.
 * This wrapper centralizes our base URL and handles common configurations.
 */

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Fallback for local development if the env var isn't set
  return 'http://localhost:8080';
};

interface FetchOptions extends RequestInit {
  // Add any custom options here
}

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  // We ensure credentials are sent so the API Gateway / Microservices receive the session cookies
  const config: RequestInit = {
    ...options,
    credentials: options.credentials || 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(url, config);
}
