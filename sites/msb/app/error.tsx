'use client';
import { LinkButton } from '@/components/static/LinkButton';
import { Button } from '@matsugov/ui/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="prose mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2">
          <span>An Error Occurred</span>
          <span className="icon-[mdi--alert] text-error size-10"></span>
        </h1>
      </div>
      <p>
        Oops! Looks like something went wrong. Please try again or go back to
        the home page.
      </p>

      <pre>{error.message}</pre>

      <div className="flex gap-2">
        <Button onClick={reset}>Try again</Button>

        <LinkButton href="/" color="primary">
          Go back
        </LinkButton>
      </div>
    </section>
  );
}
