'use client';
import React from 'react';
import { LinkButton } from '@/components/static/LinkButton/LinkButton';
import { usePathname } from 'next/navigation';

export const FeedbackButton = () => {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-2 flex justify-end mr-2">
      <div className="flex flex-col items-end gap-2">
        <LinkButton
          href="https://problemreporter.matsugov.us/"
          color="primary"
          className="before:icon-[mdi--report] before:mr-1 before:inline-block before:text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          MSB Problem Reporter
        </LinkButton>
        <LinkButton
          href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${pathname}`}
          target="_blank"
          className="before:icon-[mdi--message-alert] before:mr-1 before:-mb-1 before:inline-block before:text-lg"
          color="primary"
        >
          Give Website Feedback
        </LinkButton>
      </div>
    </div>
  );
};
