'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function InPageNavigation({
  borderPosition = 'right',
}: {
  borderPosition?: 'left' | 'right';
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    // Get all h1, h2 and h3 elements from the prose section
    const elements = Array.from(
      document.querySelector('.prose')?.querySelectorAll('h2, h3') || [],
    );

    console.log(elements);

    // Ensure each heading has an ID
    elements.forEach((heading) => {
      if (!heading.id) {
        // Convert heading text to kebab case for ID
        const id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          `heading-${Math.random().toString(36).substring(2, 9)}`;

        heading.id = id;
      }
    });

    setHeadings(elements as HTMLHeadingElement[]);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      },
    );

    // Observe all heading elements
    elements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="fixed max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h3 className="text-sm font-bold mb-2">On this page</h3>
      <ul
        className={clsx(
          'space-y-2 text-xs border-base-light border-collapse w-48 max-w-full',
          {
            'border-r': borderPosition === 'right',
            'border-l': borderPosition === 'left',
          },
        )}
      >
        {headings.map((heading) => {
          const id = heading.id;
          const text = heading.textContent;
          const tag = heading.tagName.toLowerCase();

          return (
            <li
              key={id}
              className={clsx(`border-base-darkest`, {
                'border-r-4': activeId === id && borderPosition === 'right',
                'border-l-4': activeId === id && borderPosition === 'left',
              })}
            >
              <a
                href={`#${id}`}
                className={clsx(`block hover:underline px-4 `, {
                  'text-primary hover:text-primary-dark': activeId !== id,
                  'font-bold': tag === 'h2' || tag === 'h1',
                })}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
