'use client';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { useCookieBanner } from './CookieBannerContext';

export function CookieBanner(props: {
  linkAs?: React.ElementType;
  linkHref?: string;
}) {
  const {
    shouldShowCookieBanner,
    hideCookieBanner,
    acceptCookies,
    declineCookies,
  } = useCookieBanner();

  if (!shouldShowCookieBanner) return null;

  const Link = props.linkAs || 'a';

  function handleAccept() {
    acceptCookies();
    hideCookieBanner();
  }

  function handleDecline() {
    declineCookies();
    hideCookieBanner();
  }

  return (
    <Card className="ml-2 max-w-[530px] absolute bottom-0 left-0 z-1" dark>
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
