import { describe, expect, it, vi } from 'vitest';

// `server-only` throws outside a React Server Components build.
vi.mock('server-only', () => ({}));
vi.mock('next/navigation', () => ({
  redirect: (path: string) => {
    throw new Error(`redirect:${path}`);
  },
}));

import { renderToStaticMarkup } from 'react-dom/server';
import { CmsApiError } from '@msb/cms-sdk';
import { DraftPreview } from './DraftPreview';

const validParams = { id: 'd1', expires: '1763000000', signature: 'sig' };

async function render(
  searchParams: Record<string, string | string[] | undefined>,
  load: () => Promise<string | null>,
) {
  const loadSpy = vi.fn(load);
  const node = await DraftPreview({
    livePath: '/roads',
    searchParams,
    load: loadSpy,
    children: (result) => <p>{result}</p>,
  });
  return { html: renderToStaticMarkup(<>{node}</>), loadSpy };
}

describe('DraftPreview', () => {
  it('passes the link through unchanged and renders the draft', async () => {
    const { html, loadSpy } = await render(validParams, async () => 'Draft');
    expect(loadSpy).toHaveBeenCalledWith({
      id: 'd1',
      expires: 1763000000,
      signature: 'sig',
    });
    expect(html).toBe('<p>Draft</p>');
  });

  it('redirects to the live page without an id', async () => {
    await expect(render({}, async () => 'x')).rejects.toThrow(
      'redirect:/roads',
    );
  });

  it.each([
    { ...validParams, expires: undefined },
    { ...validParams, expires: '12abc' },
    { ...validParams, signature: undefined },
  ])(
    'shows the invalid link message for %o, without calling the CMS',
    async (params) => {
      const { html, loadSpy } = await render(params, async () => 'x');
      expect(html).toContain('Preview link not valid');
      expect(loadSpy).not.toHaveBeenCalled();
    },
  );

  it('shows the invalid link message when the CMS rejects the link', async () => {
    const { html } = await render(validParams, async () => {
      throw new CmsApiError({ status: 403, message: 'No.', path: '/x' });
    });
    expect(html).toContain('Preview link not valid');
  });

  it('redirects to the live page when the draft is gone', async () => {
    await expect(render(validParams, async () => null)).rejects.toThrow(
      'redirect:/roads',
    );
  });

  it('rethrows other CMS errors', async () => {
    await expect(
      render(validParams, async () => {
        throw new CmsApiError({ status: 500, message: 'Down.', path: '/x' });
      }),
    ).rejects.toMatchObject({ status: 500 });
  });
});
