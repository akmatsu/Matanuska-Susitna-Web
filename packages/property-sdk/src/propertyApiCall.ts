/// <reference types="node" />

const baseUrl = process.env.API_URL || 'http://localhost:3000/api';

const addressSuffixesAndAbbreviations = [
  {
    suffix: 'Street',
    abbreviation: 'St',
  },
  {
    suffix: 'Avenue',
    abbreviation: 'Ave',
  },
  {
    suffix: 'Boulevard',
    abbreviation: 'Blvd',
  },
  {
    suffix: 'Road',
    abbreviation: 'Rd',
  },
  {
    suffix: 'Lane',
    abbreviation: 'Ln',
  },
  {
    suffix: 'Drive',
    abbreviation: 'Dr',
  },
  {
    suffix: 'Court',
    abbreviation: 'Ct',
  },
  {
    suffix: 'Place',
    abbreviation: 'Pl',
  },
  {
    suffix: 'Terrace',
    abbreviation: 'Ter',
  },
  {
    suffix: 'Way',
    abbreviation: 'Way',
  },
  {
    suffice: 'Circle',
    abbreviation: 'cir',
  },
];

const directionsAndAbbreviations = [
  {
    direction: 'North',
    abbreviation: 'N',
  },
  {
    direction: 'South',
    abbreviation: 'S',
  },
  {
    direction: 'East',
    abbreviation: 'E',
  },
  {
    direction: 'West',
    abbreviation: 'W',
  },
];

// need to create directionRegexLikeThis /(\d+\s)({direction})(\b)/
const directionRegex = new RegExp(
  `(\\d+\\s)(${directionsAndAbbreviations.map(({ direction }) => direction).join('|')})(\\b)`,
  'gi',
);

const suffixRegex = new RegExp(
  `( \\w+ )(${addressSuffixesAndAbbreviations.map(({ suffix }) => suffix).join('|')})$`,
  'gi',
);

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
    // Wee need to modify the query param
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        let cleanedQuery = value;
        if (
          key === 'query' &&
          (params['mode'] === 'address' || params['mode'] === 'wild')
        ) {
          // Need to replace direction with direction abbreviation
          cleanedQuery = value
            .trim()
            .replace(/[.,]/gi, '')
            .replace(directionRegex, (_, p1, p2, p3) => {
              const abbreviation =
                directionsAndAbbreviations.find(
                  ({ direction }) => direction === p2,
                )?.abbreviation ?? p2;
              return `${p1}${abbreviation}${p3}`;
            })
            .replace(suffixRegex, (_, p1, p2) => {
              const abbreviation =
                addressSuffixesAndAbbreviations.find(
                  ({ suffix }) => suffix === p2,
                )?.abbreviation ?? p2;
              return `${p1}${abbreviation}`;
            });

          console.log(cleanedQuery);
        }
        searchParams.append(key, cleanedQuery);
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
    throw new Error(
      `API call failed with status ${data.status}: ${data.statusText}`,
    );
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
