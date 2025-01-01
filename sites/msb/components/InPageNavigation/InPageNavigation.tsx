'use client';

import { useEffect, useState } from 'react';

export function InPageNavigation() {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    // Get all h1, h2 and h3 elements from the prose section
    const elements = Array.from(
      document.querySelector('.prose')?.querySelectorAll('h1, h2, h3') || [],
    );

    // Ensure each heading has an ID
    elements.forEach((heading) => {
      if (!heading.id) {
        // Convert heading text to kebab case for ID
        const id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          `heading-${Math.random().toString(36).substr(2, 9)}`;

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
    <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const id = heading.id;
          const text = heading.textContent;
          const tag = heading.tagName.toLowerCase();
          const indent = tag === 'h2' ? 'ml-4' : tag === 'h3' ? 'ml-8' : '';

          return (
            <li key={id} className={indent}>
              <a
                href={`#${id}`}
                className={`block hover:text-blue-600 transition-colors ${
                  activeId === id
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${id}`)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
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
