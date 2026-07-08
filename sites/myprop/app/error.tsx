'use client';
import { FeedbackLink } from '@/components/feedbackLink';
import { PageTitle } from '@/components/PageTitle';
import Link from 'next/link';

import { Suspense } from 'react';

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="space-y-4 text-center">
      <PageTitle title="Oops!" />
      <p>
        Don&apos;t worry —{' '}
        <span className="font-bold">you&apos;re still in MyProperty</span>, it
        just looks like an unexpected error occurred.
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        <Link href="/" className="msb-btn-primary">
          Go back to property search page
        </Link>
        <Link className="msb-btn-primary" href="/taxmaps">
          Go to Tax Maps
        </Link>
      </div>
      <figure>
        <figure>
          <pre
            className="mx-auto w-fit max-w-full text-left font-mono text-[clamp(0.3rem,1.4vw,1rem)] leading-none whitespace-pre"
            role="img"
            aria-label="ASCII 404"
          >
            __/\\\\\\\\\\\\\\\____/\\\\\\\\\________/\\\\\\\\\___________/\\\\\_________/\\\\\\\\\_____
            <br />
            &nbsp;_\/\\\///////////___/\\\///////\\\____/\\\///////\\\_______/\\\///\\\_____/\\\///////\\\___
            <br />
            &nbsp;&nbsp;_\/\\\_____________\/\\\_____\/\\\___\/\\\_____\/\\\_____/\\\/__\///\\\__\/\\\_____\/\\\___
            <br />
            &nbsp;&nbsp;&nbsp;_\/\\\\\\\\\\\_____\/\\\\\\\\\\\/____\/\\\\\\\\\\\/_____/\\\______\//\\\_\/\\\\\\\\\\\/____
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;_\/\\\///////______\/\\\//////\\\____\/\\\//////\\\____\/\\\_______\/\\\_\/\\\//////\\\____
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\/\\\_____________\/\\\____\//\\\___\/\\\____\//\\\___\//\\\______/\\\__\/\\\____\//\\\___
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\/\\\_____________\/\\\_____\//\\\__\/\\\_____\//\\\___\///\\\__/\\\____\/\\\_____\//\\\__
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\/\\\\\\\\\\\\\\\_\/\\\______\//\\\_\/\\\______\//\\\____\///\\\\\/_____\/\\\______\//\\\_
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\///////////////__\///________\///__\///________\///_______\/////_______\///________\///__
            <br />
          </pre>
          <figcaption className="sr-only">
            ASCII art of a 404 error code
          </figcaption>
        </figure>
      </figure>
      <p className="font-semibold">Looks like something went wrong.</p>
      <p>{error.message}</p>
      <pre className="bg-surface rounded">
        <code>{error.digest}</code>
      </pre>
      <p>
        <Suspense>
          <FeedbackLink>
            Report this error to the development team.
          </FeedbackLink>
        </Suspense>
      </p>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </main>
  );
}
