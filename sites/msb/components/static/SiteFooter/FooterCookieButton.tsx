'use client';

import { FooterButton } from '@matsugov/ui';
import { useCookieBanner } from '@matsugov/ui/CookieBannerContext';

export function FooterCookieButton(props: { children?: React.ReactNode }) {
  const { showCookieBanner } = useCookieBanner();
  return (
    <FooterButton onClick={() => showCookieBanner()}>
      {props.children || 'Change Cookie Settings'}
    </FooterButton>
  );
}
