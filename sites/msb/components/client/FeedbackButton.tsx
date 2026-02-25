'use client';
import { useEffect, useState } from 'react';
import { LinkButton } from '@/components/static/LinkButton/LinkButton';
import { usePathname } from 'next/navigation';
import { CookieBanner } from '@matsugov/ui/CookieBanner';
import { Button } from '@matsugov/ui';
import { useSideNavDrawer } from '@/hooks/SideNavDrawerContext';

export const FeedbackButton = () => {
  const pathname = usePathname();
  const { open, panelRef } = useSideNavDrawer();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(!!panelRef.current);
    return () => setShowButton(false);
  }, [pathname, panelRef]);

  return (
    <div className="sticky bottom-2 flex justify-between mx-2 items-end">
      <div className="flex flex-col gap-2">
        <CookieBanner />
        {showButton && (
          <Button
            className="md:hidden"
            rounded="pill"
            icon
            color="primary"
            onClick={open}
            title="Open side nav drawer"
          >
            <span className="icon-[mdi--format-list-bulleted] size-8"></span>
          </Button>
        )}
      </div>
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
          Give Web site Feedback
        </LinkButton>
      </div>
    </div>
  );
};
