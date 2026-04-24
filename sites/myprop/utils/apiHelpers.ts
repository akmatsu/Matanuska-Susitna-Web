const baseUrl = process.env.API_URL || 'http://localhost:3000/api';

/**
 * A helper function to make API calls to the property API. It constructs the full URL using the base URL and the provided path, and includes the API key in the headers. It also handles query parameters and returns the JSON response.
 */
export async function propertyApiCall<T = unknown>(
  path: string,
  params?: Record<string, string> | URLSearchParams,
  options?: RequestInit,
): Promise<T> {
  'use server';

  // Construct the full URL with query parameters if provided
  const url = new URL(`/property${path}`, baseUrl);
  if (params) {
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
  }

  // Make the API call with the appropriate headers and options
  const data = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options?.headers,
      ApiKey: process.env.API_KEY || '',
    },
  });

  // Check if the response is OK (status in the range 200-299)
  if (!data.ok) {
    throw new Error(`API call failed with status ${data.status}`);
  }

  // Parse and return the JSON response
  const json = await data.json();
  return json;
}
