import { describe, expect, it, vi } from 'vitest';

// `server-only` throws outside a React Server Components build.
vi.mock('server-only', () => ({}));

// The `@matsugov/ui` barrel can't load outside a Next build: one of its
// components imports React from a Next-internal path. Stub the pieces the
// renderer uses from the barrel.
vi.mock('@matsugov/ui', () => ({
  Callout: (props: { color?: string; children?: React.ReactNode }) => (
    <aside data-color={props.color}>{props.children}</aside>
  ),
  Button: (props: { children?: React.ReactNode }) => (
    <button>{props.children}</button>
  ),
  Pagination: () => null,
}));

import { renderToStaticMarkup } from 'react-dom/server';
import type { ContentReferences, TipTapDoc } from '@msb/cms-sdk';
import { RichContent } from './RichContent';
import keystoneConverted from './__fixtures__/keystone-converted.json';

const references: ContentReferences = {
  'service:abc123': {
    type: 'service',
    id: 'abc123',
    title: 'Pay taxes',
    path: '/services/pay-taxes',
    url: null,
  },
  // A missing or unpublished target.
  'orgUnit:x1': null,
};

const documentCollections = {
  dc1: {
    id: 'dc1',
    title: 'Forms',
    documents: [
      {
        id: 'd1',
        title: 'Permit form',
        description: null,
        url: 'https://msb-cms-documents.s3.us-west-2.amazonaws.com/a.pdf',
        filename: 'a.pdf',
      },
    ],
  },
};

function render(doc: unknown, refs: ContentReferences = references) {
  return renderToStaticMarkup(
    <RichContent
      doc={doc as TipTapDoc}
      references={refs}
      documentCollections={documentCollections}
    />,
  );
}

function doc(...content: unknown[]) {
  return { type: 'doc', content };
}

function paragraph(...content: unknown[]) {
  return { type: 'paragraph', content };
}

function text(value: string, marks?: unknown[]) {
  return { type: 'text', text: value, ...(marks ? { marks } : {}) };
}

describe('RichContent with Keystone-converted content', () => {
  const html = render(keystoneConverted);

  it('resolves dynamic links through references, including PascalCase types', () => {
    expect(html).toContain('href="/services/pay-taxes"');
    expect(html).toContain('Pay taxes');
  });

  it('shows a broken link when the reference is null', () => {
    expect(html).toMatch(/line-through[^>]*>Plain/);
  });

  it('renders the custom blocks', () => {
    expect(html).toContain('Forms'); // doc collection title
    expect(html).toContain('Permit form');
    expect(html).toContain('src="https://ex.com/embed"');
    expect(html).not.toContain('allowFullScreen'); // allowfullscreen: false
    expect(html).toContain('<aside data-color="warning">');
    // Keystone's "default" callout color is the same gray as "base".
    expect(html).toContain('<aside data-color="base">');
    expect(html).toContain('md:grid-cols-3');
    expect(html).toContain('Do thing');
    expect(html).toContain('class="text-center"');
  });

  it('renders standard markdown structures', () => {
    expect(html).toMatch(/<thead><tr><th[^>]*>A<\/th>/);
    expect(html).toContain('<li>bullet<ul><li>nested</li></ul></li>');
    expect(html).toContain('<ol start="1"><li>ordered</li></ol>');
    expect(html).toContain('<code>inline code</code>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('line one<br/>line two');
    expect(html).toContain('class="language-js"');
  });

  it('opens external links in a new tab', () => {
    expect(html).toContain(
      '<a href="https://example.com" title="T" target="_blank" rel="noopener noreferrer">ext</a>',
    );
  });
});

describe('RichContent with untrusted content', () => {
  it('drops javascript: links but keeps the text', () => {
    const html = render(
      doc(
        paragraph(
          text('click', [
            { type: 'link', attrs: { href: 'javascript:alert(1)' } },
          ]),
        ),
      ),
    );
    expect(html).toBe('<p>click</p>');
  });

  it('does not use a javascript: URL from a reference', () => {
    const html = render(
      doc(
        paragraph(
          text('x', [
            { type: 'dynamicLink', attrs: { modelType: 'url', modelId: 'u1' } },
          ]),
        ),
      ),
      {
        'url:u1': {
          type: 'url',
          id: 'u1',
          title: 'x',
          path: null,
          url: 'javascript:alert(1)',
        },
      },
    );
    expect(html).not.toContain('javascript:');
    expect(html).toContain('line-through');
  });

  it('drops iframes that are not https', () => {
    const html = render(
      doc({ type: 'iframe', attrs: { src: 'http://example.com/embed' } }),
    );
    expect(html).toBe('');
  });

  it('keeps only allowed iframe features', () => {
    const html = render(
      doc({
        type: 'iframe',
        attrs: {
          src: 'https://example.com/embed',
          allow: 'camera; fullscreen; microphone; autoplay',
        },
      }),
    );
    expect(html).toContain('allow="fullscreen; autoplay"');
  });

  it('drops images with unsafe sources', () => {
    const html = render(
      doc(
        paragraph({
          type: 'image',
          attrs: { src: 'data:image/svg+xml,<svg/>' },
        }),
      ),
    );
    expect(html).toBe('<p></p>');
  });

  it('keeps the text of unknown nodes and marks but not their markup', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const html = render(
      doc({
        type: 'scriptBlock',
        attrs: { onload: 'alert(1)' },
        content: [paragraph(text('inside', [{ type: 'blink' }]))],
      }),
    );
    expect(html).toBe('<p>inside</p>');
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it('escapes text', () => {
    const html = render(doc(paragraph(text('<script>alert(1)</script>'))));
    expect(html).toBe('<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>');
  });

  it('renders nothing for empty content', () => {
    expect(render(null)).toBe('');
    expect(render(doc())).toBe('');
  });
});
