'use client';
import { createContext, useContext, useState } from 'react';

type CookieConsent = 'accepted' | 'declined' | null;

// Bump the version to reset everyone's saved choice.
const CONSENT_KEY = 'cookie-consent-v2';

const CookieBannerContext = createContext<{
  shouldShowCookieBanner: boolean;
  consent: CookieConsent;
  showCookieBanner: () => void;
  hideCookieBanner: () => void;
  acceptCookies: () => void;
  declineCookies: () => void;
}>({
  shouldShowCookieBanner: false,
  consent: null,
  showCookieBanner: () => {},
  hideCookieBanner: () => {},
  acceptCookies: () => {},
  declineCookies: () => {},
});

export function CookieBannerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldShowCookieBanner, setShouldShowCookieBanner] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(CONSENT_KEY);
    return (stored as CookieConsent) || null;
  });

  function hideCookieBanner() {
    setShouldShowCookieBanner(false);
  }

  function showCookieBanner() {
    setShouldShowCookieBanner(true);
  }

  function acceptCookies() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  }

  function declineCookies() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setConsent('declined');
  }

  return (
    <CookieBannerContext.Provider
      value={{
        shouldShowCookieBanner,
        consent,
        showCookieBanner,
        hideCookieBanner,
        acceptCookies,
        declineCookies,
      }}
    >
      {children}
    </CookieBannerContext.Provider>
  );
}

export const useCookieBanner = () => useContext(CookieBannerContext);
