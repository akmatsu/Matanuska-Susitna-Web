'use client';
import React from 'react';
import { LinkButton } from '@/components/static/LinkButton/LinkButton';
import { usePathname } from 'next/navigation';

export const FeedbackButton = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-2 flex justify-end mr-2">
      <LinkButton
        href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${pathname}`}
        target="_blank"
        className="usa-link--external"
        color="primary"
      >
        Give us Feedback
      </LinkButton>
    </div>
  );
};
