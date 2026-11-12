import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// `server-only` throws outside a React Server Components build.
vi.mock('server-only', () => ({}));

import { CmsApiError } from './core/client';
import {
  getService,
  getServiceDraft,
  listAllServices,
  listServices,
} from './services';
import type { ServiceWith } from './services';

const fetchMock = vi.fn();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function page(data: unknown[], currentPage: number, lastPage: number) {
  return {
    data,
    links: { first: null, last: null, prev: null, next: null },
    meta: {
      current_page: currentPage,
      from: 1,
      last_page: lastPage,
      links: [],
      path: null,
      per_page: 100,
      to: 1,
      total: data.length,
    },
  };
}

beforeEach(() => {
  vi.stubEnv('CMS_API_URL', 'http://cms.test/api/sites/v1/');
  vi.stubEnv('CMS_API_KEY', 'test-key');
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getService', () => {
  it('builds the URL, sends the key, and tags the request', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        data: { slug: 'a b' },
        references: {},
        documentCollections: {},
      }),
    );

    await getService('a b', {
      include: ['contacts', 'topics'],
      revalidate: 30,
    });

    const [url, init] = fetchMock.mock.calls[0];
    // Keeps the base URL's path, encodes the slug, and comma-joins include.
    expect(url).toBe(
      'http://cms.test/api/sites/v1/services/a%20b?include=contacts%2Ctopics',
    );
    expect(init.headers).toEqual({
      Accept: 'application/json',
      Authorization: 'Bearer test-key',
    });
    expect(init.next).toEqual({
      revalidate: 30,
      tags: ['cms', 'cms:services', 'cms:services:a b'],
    });
  });

  it('returns null on 404', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Not found.' }, 404));
    await expect(getService('missing')).resolves.toBeNull();
  });

  it.each([400, 401, 429, 500])('throws CmsApiError on %i', async (status) => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Nope.' }, status));
    const error = await getService('x').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(CmsApiError);
    expect(error).toMatchObject({ status, path: '/services/x' });
    // The API key must never end up in an error message.
    expect(String((error as Error).message)).not.toContain('test-key');
  });

  it('does not follow redirects, and explains the likely misconfiguration', async () => {
    fetchMock.mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: { Location: '/api/auth/signin' },
      }),
    );

    const error = await getService('x').catch((e: unknown) => e);

    expect(fetchMock.mock.calls[0][1].redirect).toBe('manual');
    expect(error).toBeInstanceOf(CmsApiError);
    expect(String((error as Error).message)).toMatch(
      /Redirected to \/api\/auth\/signin.*CMS_API_URL/,
    );
  });

  it('rejects a successful response that is not JSON', async () => {
    fetchMock.mockResolvedValue(
      new Response('<!DOCTYPE html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      }),
    );

    await expect(getService('x')).rejects.toThrow(
      /Expected JSON but got "text\/html.*CMS_API_URL/,
    );
  });

  it('throws when the env is not configured', async () => {
    vi.stubEnv('CMS_API_KEY', '');
    await expect(getService('x')).rejects.toThrow(/CMS_API_KEY is not set/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('getServiceDraft', () => {
  const link = { id: '01jabc', expires: 1763000000, signature: 'abc123' };

  it('forwards the signed link and is never cached', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ data: {}, references: {}, documentCollections: {} }),
    );

    await getServiceDraft(link, { include: ['contacts'] });

    const [url, init] = fetchMock.mock.calls[0];
    const parsed = new URL(url);
    // The CMS signs this exact path, so it must not change.
    expect(parsed.pathname).toBe('/api/sites/v1/service-drafts/01jabc');
    expect(Object.fromEntries(parsed.searchParams)).toEqual({
      expires: '1763000000',
      signature: 'abc123',
      include: 'contacts',
    });
    expect(init.cache).toBe('no-store');
    expect(init.next).toBeUndefined();
  });

  it('returns null when the draft is gone, and throws 403 for a bad link', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Gone.' }, 404));
    await expect(getServiceDraft(link)).resolves.toBeNull();

    fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Bad.' }, 403));
    await expect(getServiceDraft(link)).rejects.toMatchObject({ status: 403 });
  });
});

describe('listServices', () => {
  it('serializes paging, sort and filters, and keeps 422 field errors', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        { message: 'Invalid.', errors: { per_page: ['Too big.'] } },
        422,
      ),
    );

    const error = await listServices({
      page: 2,
      perPage: 10,
      sort: '-updatedAt',
      filter: { topics: ['roads', 'taxes'] },
    }).catch((e: unknown) => e);

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      page: '2',
      per_page: '10',
      sort: '-updatedAt',
      'filter[topics]': 'roads,taxes',
    });
    expect(error).toMatchObject({
      status: 422,
      errors: { per_page: ['Too big.'] },
    });
  });
});

describe('listAllServices', () => {
  it('walks every page at the max page size', async () => {
    fetchMock.mockImplementation(async (url: string) => {
      const n = Number(new URL(url).searchParams.get('page'));
      return jsonResponse(page([{ slug: `s${n}` }], n, 3));
    });

    const all = await listAllServices();

    expect(all.map((s) => s.slug)).toEqual(['s1', 's2', 's3']);
    expect(
      new URL(fetchMock.mock.calls[0][0]).searchParams.get('per_page'),
    ).toBe('100');
  });
});

// Compile-time checks only: these run under `tsc`, not at runtime.
export function includeTypeChecks(service: ServiceWith<'contacts'>) {
  // Requested relations are present.
  service.contacts.map((c) => c.name);
  // @ts-expect-error relations that weren't requested may be missing
  service.topics.map((t) => t.title);
  // @ts-expect-error only real include names are accepted
  void getService('x', { include: ['notARelation'] });
}
