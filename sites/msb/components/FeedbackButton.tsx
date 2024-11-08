'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const FeedbackButton = () => {
  const pathname = usePathname();

  return (
    <Link
      href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${pathname}`}
      target="_blank"
      className="usa-button usa-link--external position-fixed bottom-105 right-105"
    >
      Give us Feedback
    </Link>
  );
};
