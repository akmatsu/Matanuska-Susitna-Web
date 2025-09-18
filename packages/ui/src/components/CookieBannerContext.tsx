'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type CookieConsent = 'accepted' | 'declined' | null;

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
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as CookieConsent;
    if (!stored) {
      showCookieBanner();
    } else {
      setConsent(stored);
    }
  });

  function hideCookieBanner() {
    setShouldShowCookieBanner(false);
  }

  function showCookieBanner() {
    setShouldShowCookieBanner(true);
  }

  function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
  }

  function declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
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
