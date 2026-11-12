import { describe, expect, it, vi } from 'vitest';

// The `@matsugov/ui` barrel can't load outside a Next build.
vi.mock('@matsugov/ui', () => ({}));

import { renderToStaticMarkup } from 'react-dom/server';
import type { InternalLink } from '@msb/cms-sdk';
import { hasInternalActions, InternalActionsView } from './PageActions';

function link(
  id: string,
  label: string,
  target: Partial<NonNullable<InternalLink['target']>> | null,
): InternalLink {
  return {
    id,
    label,
    target: target && {
      type: 'service',
      id: `t-${id}`,
      title: `Title ${id}`,
      path: null,
      url: null,
      ...target,
    },
  };
}

describe('InternalActionsView', () => {
  it('links to the target path, or its url when there is no path', () => {
    const html = renderToStaticMarkup(
      <InternalActionsView
        actions={[
          link('1', 'Pay taxes', { path: '/services/pay-taxes' }),
          link('2', '', { type: 'document', url: 'https://files.test/a.pdf' }),
        ]}
      />,
    );

    expect(html).toContain('href="/services/pay-taxes"');
    expect(html).toContain('Pay taxes');
    expect(html).toContain('href="https://files.test/a.pdf"');
    // An empty label falls back to the target's title.
    expect(html).toContain('Title 2');
  });

  it('leaves out missing targets and unsafe urls', () => {
    const actions = [
      link('1', 'Gone', null),
      link('2', 'Bad', { type: 'url', url: 'javascript:alert(1)' }),
    ];

    expect(
      renderToStaticMarkup(<InternalActionsView actions={actions} />),
    ).toBe('');
    expect(hasInternalActions(actions)).toBe(false);
    expect(
      hasInternalActions([...actions, link('3', 'Ok', { path: '/x' })]),
    ).toBe(true);
  });
});
