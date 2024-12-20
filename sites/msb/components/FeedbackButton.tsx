'use client';
import React from 'react';
import { LinkButton } from '@/components/LinkButton/LinkButton';
import { usePathname } from 'next/navigation';

export const FeedbackButton = () => {
  const pathname = usePathname();

  return (
    <div className="position-sticky bottom-105 left-full padding-right-105 display-flex flex-justify-end">
      <LinkButton
        href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${pathname}`}
        target="_blank"
        className="usa-link--external"
      >
        Give us Feedback
      </LinkButton>
    </div>
  );
};
