'use client';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

export function CookieBanner(props: {
  linkAs?: React.ElementType;
  linkHref?: string;
}) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShowBanner(true);
    if (consent === 'accepted') loadAnalytics();
  }, []);

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted');
    loadAnalytics();
    setShowBanner(false);
  }

  function handleDecline() {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  }

  function loadAnalytics() {
    const script = document.createElement('script');
    script.src = '//script.crazyegg.com/pages/scripts/0127/8089.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }

  if (!showBanner) return null;

  const Link = props.linkAs || 'a';

  return (
    <Card className="fixed bottom-0 left-0 m-2 max-w-[530px]" dark>
      <CardHeader>
        <CardTitle>We Use Cookies</CardTitle>
      </CardHeader>
      <CardBody>
        <p>
          This website uses cookies for analytics to improve your experience. By
          accepting all cookies you are agreeing to our{' '}
          <Link
            href={props.linkHref || '/policies/cookies'}
            className="text-secondary"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </CardBody>
      <CardFooter className="flex-col-reverse items-center sm:flex-row sm:justify-end">
        <Button color="primary" onClick={handleDecline}>
          Reject Non-Essential Cookies
        </Button>
        <Button color="primary" onClick={handleAccept}>
          Accept All Cookies
        </Button>
      </CardFooter>
    </Card>
  );
}
