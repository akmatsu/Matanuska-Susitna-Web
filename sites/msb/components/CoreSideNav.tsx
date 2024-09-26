'use client';

import { SideNav } from '@trussworks/react-uswds';
import { Header } from 'next/dist/lib/load-custom-routes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CoreSideNav() {
  const [headers, setHeaders] = useState<
    { id: string; tag: string; text?: string }[]
  >([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headerElements = document.querySelectorAll(
        'main h1, main h2, main h3',
      );

      const headerArray = Array.from(headerElements).map((header, index) => {
        if (!header.id) {
          header.id = `header-${header.textContent?.replace(' ', '-') || index}`;
        }
        return {
          id: header.id,
          tag: header.tagName,
          text: header.textContent || undefined,
        };
      });

      setHeaders(headerArray);
    }
  }, []);

  return (
    <SideNav
      items={headers.map((header) => {
        return <Link href={`#${header.id}`}>{header.text}</Link>;
      })}
    ></SideNav>
  );
}
