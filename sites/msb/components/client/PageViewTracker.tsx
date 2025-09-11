'use client';

import { useEffect } from 'react';

export function PageViewTracker({
  pageId,
  pageType,
}: {
  pageId: string;
  pageType: string;
}) {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      if (pageId && pageType)
        fetch(`${apiUrl}/api/page-views`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageId,
            pageType,
          }),
        }).catch((err) => {
          console.error('Page view counting failed', err);
        });
    }
  }, [pageId, pageType]);

  return null;
}
