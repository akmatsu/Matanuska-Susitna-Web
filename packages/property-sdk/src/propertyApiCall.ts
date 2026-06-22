const baseUrl = process.env.API_URL || 'http://localhost:3000/api';

/**
 * A helper function to make API calls to the property API. It constructs the full URL using the base URL and the provided path, and includes the API key in the headers. It also handles query parameters and returns the JSON response.
 */
export async function propertyApiCall<T = unknown>(
  path: string,
  params?: Record<string, string | string[]>,
  options?: RequestInit,
): Promise<T> {
  'use server';

  const normalizedPath = normalizePropertyPath(path);

  // Construct the full URL with query parameters if provided
  const url = new URL(`/property${normalizedPath}`, baseUrl);
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    }
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

function normalizePropertyPath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Disallow URL/authority and query/fragment control in path input.
  if (
    normalizedPath.includes('..') ||
    normalizedPath.includes('://') ||
    normalizedPath.includes('\\') ||
    normalizedPath.includes('?') ||
    normalizedPath.includes('#')
  ) {
    throw new Error('Invalid property API path');
  }

  // Disallow dot segments to prevent directory traversal
  const segments = normalizedPath.split('/').filter(Boolean);
  for (const segment of segments) {
    const decoded = decodeURIComponent(segment);
    if (decoded === '.' || decoded === '..') {
      throw new Error('Invalid property API path');
    }
  }

  return normalizedPath;
}
