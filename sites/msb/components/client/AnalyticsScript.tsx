'use client';
import { useCookieBanner } from '@matsugov/ui/CookieBannerContext';
import Script from 'next/script';

export function AnalyticsScript() {
  const { consent } = useCookieBanner();

  if (consent !== 'accepted') return null;

  return (
    <Script
      src="//script.crazyegg.com/pages/scripts/0127/8089.js"
      async
      type="text/javascript"
    />
  );
}
