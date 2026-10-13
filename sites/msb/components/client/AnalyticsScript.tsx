'use client';
import { useEffect, useRef } from 'react';
import { useCookieBanner } from '@matsugov/ui/CookieBannerContext';
import Script from 'next/script';

// Covers _ce.*, _CEFT, ce_*, cebs, cebsp_*, and cer.*
const CRAZY_EGG_COOKIE = /^(_ce|ce_|cebs|cer\.)/i;

function removeCrazyEggCookies() {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => CRAZY_EGG_COOKIE.test(name));

  // Crazy Egg may set cookies on any parent domain, and a cookie can only be
  // removed with the domain it was set on, so expire each one at every level.
  const parts = location.hostname.split('.');
  const domains = parts.map((_, i) => parts.slice(i).join('.'));
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  for (const name of names) {
    document.cookie = `${name}=; ${expired}`;
    for (const domain of domains) {
      document.cookie = `${name}=; ${expired}; domain=${domain}`;
    }
  }
}

export function AnalyticsScript() {
  const { consent } = useCookieBanner();
  const initialConsent = useRef(consent);

  useEffect(() => {
    if (consent !== 'declined') return;

    removeCrazyEggCookies();

    // A script can't be unloaded once it runs, so reload to stop tracking.
    if (initialConsent.current !== 'declined') window.location.reload();
  }, [consent]);

  if (consent === 'declined') return null;

  return (
    <Script
      src="//script.crazyegg.com/pages/scripts/0127/8089.js"
      async
      type="text/javascript"
    />
  );
}
