'use client';

import { PageTitle } from '@/components/PageTitle';
import Link from 'next/link';

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const url = window.location.href;
  return (
    <main className="space-y-4 text-center">
      <PageTitle title="Oops!" />
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
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${url}`}
        >
          Report an issue to the development team.
        </Link>
      </p>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </main>
  );
}
