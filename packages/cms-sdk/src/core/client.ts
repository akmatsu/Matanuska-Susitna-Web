/// <reference types="node" />
import 'server-only';
import type { paths } from '../generated/sites';

/** API paths that support GET. */
export type CmsGetPath = {
  [P in keyof paths]: paths[P] extends { get: object } ? P : never;
}[keyof paths];

type GetOperation<P extends CmsGetPath> = paths[P]['get'];

/** Query string parameters accepted by a GET path. */
export type CmsQuery<P extends CmsGetPath> =
  GetOperation<P>['parameters'] extends { query?: infer Q }
    ? NonNullable<Q>
    : never;

/** Path parameters (like `{slug}`) required by a GET path. */
export type CmsPathParams<P extends CmsGetPath> =
  GetOperation<P>['parameters'] extends { path: infer T } ? T : never;

/** The JSON body of a successful (200) GET response. */
export type CmsResponse<P extends CmsGetPath> =
  GetOperation<P>['responses'][200]['content']['application/json'];

/**
 * Next.js data cache settings for a request. They are passed to `fetch` as
 * its `next` option. This package does not depend on Next, so the type is
 * declared here.
 */
export type CmsCacheConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export type CmsGetOptions<P extends CmsGetPath> = {
  query?: CmsQuery<P>;
  next?: CmsCacheConfig;
  /**
   * Passed to `fetch`. Use `'no-store'` for responses that must never be
   * cached, like draft previews.
   */
  cache?: RequestCache;
} & ([CmsPathParams<P>] extends [never]
  ? { path?: never }
  : { path: CmsPathParams<P> });

/** Thrown for any response from the CMS API that is not a success. */
export class CmsApiError extends Error {
  readonly status: number;
  /** Field errors from a 422 validation response. */
  readonly errors?: Record<string, string[]>;
  /** The API path that failed, without the base URL or query string. */
  readonly path: string;

  constructor(args: {
    status: number;
    message: string;
    path: string;
    errors?: Record<string, string[]>;
  }) {
    super(`CMS API ${args.status} on ${args.path}: ${args.message}`);
    this.name = 'CmsApiError';
    this.status = args.status;
    this.path = args.path;
    this.errors = args.errors;
  }
}

function requireEnv(name: 'CMS_API_URL' | 'CMS_API_KEY') {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. The CMS SDK needs CMS_API_URL and CMS_API_KEY in the server environment.`,
    );
  }
  return value;
}

function fillPathParams(path: string, params?: Record<string, string>) {
  return path.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params?.[key];
    if (value === undefined) {
      throw new Error(`Missing path parameter "${key}" for ${path}`);
    }
    return encodeURIComponent(value);
  });
}

/**
 * Builds the query string. Arrays are joined with commas, because the CMS
 * reads `include` and `filter[...]` as comma-separated lists.
 */
export function toSearchParams(query?: Record<string, unknown>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length) params.set(key, value.join(','));
      continue;
    }
    params.set(key, String(value));
  }
  return params;
}

async function readError(res: Response) {
  try {
    const body = (await res.json()) as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    return { message: body.message || res.statusText, errors: body.errors };
  } catch {
    return { message: res.statusText };
  }
}

/**
 * Typed GET request to the CMS sites API. The path, its parameters, the
 * query and the response type all come from the generated OpenAPI types.
 *
 * Server-only: it sends the site's API key.
 */
export async function cmsGet<P extends CmsGetPath>(
  path: P,
  options: CmsGetOptions<P>,
): Promise<CmsResponse<P>> {
  // Read the env at call time, not at import time, so a missing value
  // fails the request that needs it with a clear message.
  const baseUrl = requireEnv('CMS_API_URL').replace(/\/+$/, '');
  const apiKey = requireEnv('CMS_API_KEY');

  const filledPath = fillPathParams(
    path,
    options.path as Record<string, string> | undefined,
  );
  const search = toSearchParams(options.query as Record<string, unknown>);
  const url = `${baseUrl}${filledPath}${search.size ? `?${search}` : ''}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    // The API never redirects. A redirect means CMS_API_URL points at the
    // wrong server (often a sign-in page), so fail instead of following it
    // and sending the API key along.
    redirect: 'manual',
    ...(options.cache ? { cache: options.cache } : {}),
    // `next` is a Next.js extension to RequestInit.
    ...(options.next ? { next: options.next } : {}),
  } as RequestInit);

  if (res.status >= 300 && res.status < 400) {
    throw new CmsApiError({
      status: res.status,
      message: `Redirected to ${res.headers.get('location') ?? 'another URL'}. Check that CMS_API_URL is the Laravel CMS sites API, e.g. https://<host>/api/sites/v1.`,
      path: filledPath,
    });
  }

  if (!res.ok) {
    const { message, errors } = await readError(res);
    throw new CmsApiError({
      status: res.status,
      message,
      errors,
      path: filledPath,
    });
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new CmsApiError({
      status: res.status,
      message: `Expected JSON but got "${contentType || 'no content type'}". Check that CMS_API_URL is the Laravel CMS sites API, e.g. https://<host>/api/sites/v1.`,
      path: filledPath,
    });
  }

  return (await res.json()) as CmsResponse<P>;
}

/**
 * Waits for a CMS request and returns `null` when the CMS answers 404
 * (the record doesn't exist or isn't published). Other errors are thrown.
 */
export async function nullOn404<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof CmsApiError && error.status === 404) return null;
    throw error;
  }
}
