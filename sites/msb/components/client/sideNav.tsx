'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { Link } from '../static/Link';
import clsx from 'clsx';

type HeadingNode = {
  id: string;
  text: string;
  level: number;
};

type SideNavProps = {
  onNavigate?: () => void;
  onHeadingsChange?: (hasHeadings: boolean) => void;
  className?: string;
};

function slugify(text: string, existingIds: Set<string>) {
  const base =
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'section';

  let slug = base;
  let suffix = 1;
  while (existingIds.has(slug)) {
    slug = `${base}-${suffix++}`;
  }
  existingIds.add(slug);
  return slug;
}

function isVisible(node: HTMLElement) {
  if (node.getAttribute('aria-hidden') === 'true') {
    return false;
  }

  if (node.closest('[aria-hidden="true"]')) {
    return false;
  }

  if (
    node.hasAttribute('hidden') ||
    node.closest('[hidden]') ||
    node.classList.contains('nav-ignore') ||
    node.closest('.nav-ignore')
  ) {
    return false;
  }

  const style = window.getComputedStyle(node);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }

  if (node.getClientRects().length === 0 && style.position !== 'fixed') {
    return false;
  }

  return true;
}

export function SideNav({
  onNavigate,
  onHeadingsChange,
  className,
}: SideNavProps = {}) {
  const [headings, setHeadings] = useState<HeadingNode[]>([]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) {
      return undefined;
    }

    const existingIds = new Set<string>();

    const collectHeadings = () => {
      existingIds.clear();
      const nodes = Array.from<HTMLElement>(
        main.querySelectorAll('h1, h2, h3'),
      ).filter(isVisible);

      const seenIds = new Set<string>();

      const next: HeadingNode[] = nodes
        .map((node) => {
          const text = node.textContent?.trim() ?? '';
          if (!text) {
            return undefined;
          }

          let id = node.id;
          if (!id) {
            id = slugify(text, existingIds);
            node.id = id;
          } else {
            existingIds.add(id);
          }

          return {
            id,
            text,
            level: Number(node.tagName.replace('H', '')),
          } satisfies HeadingNode;
        })
        .filter((heading): heading is HeadingNode => {
          if (!heading) {
            return false;
          }
          if (seenIds.has(heading.id)) {
            return false;
          }
          seenIds.add(heading.id);
          return true;
        });

      setHeadings(next);
    };

    collectHeadings();

    const observer = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        return (
          mutation.type === 'childList' ||
          (mutation.type === 'attributes' &&
            mutation.target instanceof HTMLElement &&
            /^h[1-3]$/i.test(mutation.target.tagName))
        );
      });

      if (shouldUpdate) {
        collectHeadings();
      }
    });

    // Keep nav aligned with async page updates.
    observer.observe(main, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onHeadingsChange?.(headings.length > 0);
  }, [headings.length, onHeadingsChange]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    onNavigate?.();
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="On this page"
      className={clsx('sticky top-4 w-full', className)}
    >
      <p className="font-bold">On This Page</p>
      <ol className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: (heading.level - 1) * 12 }}>
            <Link
              href={`#${heading.id}`}
              onClick={(event) => handleClick(event, heading.id)}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
