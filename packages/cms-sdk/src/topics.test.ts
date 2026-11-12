import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// `server-only` throws outside a React Server Components build.
vi.mock('server-only', () => ({}));

import { CmsApiError } from './core/client';
import { getTopic, getTopicDraft, listAllTopics, listTopics } from './topics';
import type { TopicWith } from './topics';

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

describe('getTopic', () => {
  it('builds the URL, sends the key, and tags the request', async () => {
    fetchMock.mockResolvedValue(jsonResponse(detail));

    await getTopic('roads', {
      include: ['actions', 'facilities'],
      revalidate: 30,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'http://cms.test/api/sites/v1/topics/roads?include=actions%2Cfacilities',
    );
    expect(init.headers).toEqual({
      Accept: 'application/json',
      Authorization: 'Bearer test-key',
    });
    expect(init.next).toEqual({
      revalidate: 30,
      tags: ['cms', 'cms:topics', 'cms:topics:roads'],
    });
  });

  it('returns null on 404', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Not found.' }, 404));
    await expect(getTopic('missing')).resolves.toBeNull();
  });

  it('throws CmsApiError on other errors', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Nope.' }, 500));
    await expect(getTopic('x')).rejects.toBeInstanceOf(CmsApiError);
  });
});

describe('getTopicDraft', () => {
  const link = { id: '01jabc', expires: 1763000000, signature: 'abc123' };

  it('forwards the signed link and is never cached', async () => {
    fetchMock.mockResolvedValue(jsonResponse(detail));

    await getTopicDraft(link, { include: ['boards'] });

    const [url, init] = fetchMock.mock.calls[0];
    const parsed = new URL(url);
    // The CMS signs this exact path, so it must not change.
    expect(parsed.pathname).toBe('/api/sites/v1/topic-drafts/01jabc');
    expect(Object.fromEntries(parsed.searchParams)).toEqual({
      expires: '1763000000',
      signature: 'abc123',
      include: 'boards',
    });
    expect(init.cache).toBe('no-store');
    expect(init.next).toBeUndefined();
  });

  it('returns null when the draft is gone', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Not found.' }, 404));
    await expect(getTopicDraft(link)).resolves.toBeNull();
  });

  it('throws a 403 CmsApiError for an invalid or expired link', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ message: 'This preview link is invalid.' }, 403),
    );
    await expect(getTopicDraft(link)).rejects.toMatchObject({ status: 403 });
  });
});

describe('listTopics', () => {
  it('serializes paging, sort and filters', async () => {
    fetchMock.mockResolvedValue(jsonResponse(page([], 2, 2)));

    await listTopics({
      page: 2,
      perPage: 10,
      sort: '-updatedAt',
      filter: { slug: ['roads', 'taxes'], tags: ['1'] },
    });

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      page: '2',
      per_page: '10',
      sort: '-updatedAt',
      'filter[slug]': 'roads,taxes',
      'filter[tags]': '1',
    });
  });
});

describe('listAllTopics', () => {
  it('walks every page at the max page size', async () => {
    fetchMock.mockImplementation(async (url: string) => {
      const n = Number(new URL(url).searchParams.get('page'));
      return jsonResponse(page([{ slug: `t${n}` }], n, 2));
    });

    const all = await listAllTopics();

    expect(all.map((t) => t.slug)).toEqual(['t1', 't2']);
    expect(
      new URL(fetchMock.mock.calls[0][0]).searchParams.get('per_page'),
    ).toBe('100');
  });
});

// Compile-time checks only: these run under `tsc`, not at runtime.
export function includeTypeChecks(topic: TopicWith<'actions'>) {
  // Requested relations are present.
  topic.actions.map((a) => a.label);
  // @ts-expect-error relations that weren't requested may be missing
  topic.boards.map((b) => b.title);
  // @ts-expect-error only real include names are accepted
  void getTopic('x', { include: ['notARelation'] });
}
