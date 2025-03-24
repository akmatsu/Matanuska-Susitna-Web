'use client';

import { Button } from '@matsugov/ui';
import Link from 'next/link';
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
    <section className="max-w-6xl mx-auto px-4 py-16 prose">
      <div className="flex gap-2 items-center">
        <h1 className="flex gap-2 items-center">
          <span>An Error Occurred</span>
          <span className="iconify mdi--alert size-10 text-error"></span>
        </h1>
      </div>
      <p>
        Oops! Looks like something went wrong. Please try again or go back to
        the home page.
      </p>

      <pre>{error.message}</pre>

      <div className="flex gap-2">
        <Button onClick={reset} color="base">
          Try again
        </Button>

        <Button as={Link} href="/">
          Go Back
        </Button>
      </div>
    </section>
  );
}
