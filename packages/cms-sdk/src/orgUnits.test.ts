import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// `server-only` throws outside a React Server Components build.
vi.mock('server-only', () => ({}));

import { CmsApiError } from './core/client';
import {
  getOrgUnit,
  getOrgUnitDraft,
  listAllOrgUnits,
  listOrgUnits,
} from './orgUnits';
import type { OrgUnitWith } from './orgUnits';

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

const detail = { data: { slug: 'x' }, references: {}, documentCollections: {} };

beforeEach(() => {
  vi.stubEnv('CMS_API_URL', 'http://cms.test/api/sites/v1');
  vi.stubEnv('CMS_API_KEY', 'test-key');
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getOrgUnit', () => {
  it('builds the URL, sends the key, and tags the request', async () => {
    fetchMock.mockResolvedValue(jsonResponse(detail));

    await getOrgUnit('planning', {
      include: ['parent', 'children'],
      revalidate: 30,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'http://cms.test/api/sites/v1/org-units/planning?include=parent%2Cchildren',
    );
    expect(init.headers).toEqual({
      Accept: 'application/json',
      Authorization: 'Bearer test-key',
    });
    expect(init.next).toEqual({
      revalidate: 30,
      tags: ['cms', 'cms:org-units', 'cms:org-units:planning'],
    });
  });

  it('returns null on 404', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Not found.' }, 404));
    await expect(getOrgUnit('missing')).resolves.toBeNull();
  });

  it('throws CmsApiError on other errors', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Nope.' }, 500));
    await expect(getOrgUnit('x')).rejects.toBeInstanceOf(CmsApiError);
  });
});

describe('getOrgUnitDraft', () => {
  const link = { id: '01jabc', expires: 1763000000, signature: 'abc123' };

  it('forwards the signed link and is never cached', async () => {
    fetchMock.mockResolvedValue(jsonResponse(detail));

    await getOrgUnitDraft(link, { include: ['children'] });

    const [url, init] = fetchMock.mock.calls[0];
    const parsed = new URL(url);
    // The CMS signs this exact path, so it must not change.
    expect(parsed.pathname).toBe('/api/sites/v1/org-unit-drafts/01jabc');
    expect(Object.fromEntries(parsed.searchParams)).toEqual({
      expires: '1763000000',
      signature: 'abc123',
      include: 'children',
    });
    expect(init.cache).toBe('no-store');
    expect(init.next).toBeUndefined();
  });

  it('returns null when the draft is gone', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Not found.' }, 404));
    await expect(getOrgUnitDraft(link)).resolves.toBeNull();
  });

  it('throws a 403 CmsApiError for an invalid or expired link', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ message: 'This preview link is invalid.' }, 403),
    );
    await expect(getOrgUnitDraft(link)).rejects.toMatchObject({ status: 403 });
  });
});

describe('listOrgUnits', () => {
  it('serializes paging, sort and filters', async () => {
    fetchMock.mockResolvedValue(jsonResponse(page([], 2, 2)));

    await listOrgUnits({
      page: 2,
      perPage: 10,
      sort: '-updatedAt',
      filter: {
        slug: ['planning', 'clerk'],
        tags: ['1'],
        unitType: ['department', 'office'],
        showPage: true,
      },
    });

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      page: '2',
      per_page: '10',
      sort: '-updatedAt',
      'filter[slug]': 'planning,clerk',
      'filter[tags]': '1',
      'filter[unitType]': 'department,office',
      'filter[showPage]': 'true',
    });
  });

  it('sends showPage=false when asked', async () => {
    fetchMock.mockResolvedValue(jsonResponse(page([], 1, 1)));

    await listOrgUnits({ filter: { showPage: false } });

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.searchParams.get('filter[showPage]')).toBe('false');
  });
});

describe('listAllOrgUnits', () => {
  it('walks every page at the max page size', async () => {
    fetchMock.mockImplementation(async (url: string) => {
      const n = Number(new URL(url).searchParams.get('page'));
      return jsonResponse(page([{ slug: `o${n}` }], n, 2));
    });

    const all = await listAllOrgUnits();

    expect(all.map((o) => o.slug)).toEqual(['o1', 'o2']);
    expect(
      new URL(fetchMock.mock.calls[0][0]).searchParams.get('per_page'),
    ).toBe('100');
  });
});

// Compile-time checks only: these run under `tsc`, not at runtime.
export function includeTypeChecks(orgUnit: OrgUnitWith<'parent' | 'children'>) {
  // Requested relations are present. A single relation keeps its null.
  void orgUnit.parent?.title;
  orgUnit.children.map((c) => c.title);
  // @ts-expect-error relations that weren't requested may be missing
  orgUnit.boards.map((b) => b.title);
  // @ts-expect-error only real include names are accepted
  void getOrgUnit('x', { include: ['notARelation'] });
}
