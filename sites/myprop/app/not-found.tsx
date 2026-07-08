import { FeedbackLink } from '@/components/feedbackLink';
import { PageTitle } from '@/components/PageTitle';
import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFoundPage() {
  return (
    <main className="space-y-4 text-center">
      <PageTitle title="MyProperty — Page Not Found" />
      <p>
        Looks like this page doesn&apos;t exist or has been moved. MyProperty
        has recently been updated so some old links may no longer work.
      </p>
      <p>
        Use the links to below to go back to the property search page or tax
        maps, or report an issue if you still can&apos;t find what you&apos;re
        looking for.
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        <Link href="/" className="msb-btn-primary">
          Go back to property search page
        </Link>
        <Link className="msb-btn-primary" href="/taxmaps">
          Go to Tax Maps
        </Link>
      </div>
      {/* <figure>
        <pre
          className="mx-auto w-fit max-w-full text-left font-mono text-[clamp(0.5rem,1.6vw,1rem)] leading-none whitespace-pre"
          role="img"
          aria-label="ASCII 404"
        >
          ____________/\\\________/\\\\\\\_______________/\\\____
          <br />
          &nbsp;__________/\\\\\______/\\\/////\\\___________/\\\\\____
          <br />
          &nbsp;&nbsp;________/\\\/\\\_____/\\\____\//\\\________/\\\/\\\____
          <br />
          &nbsp;&nbsp;&nbsp;______/\\\/\/\\\____\/\\\_____\/\\\______/\\\/\/\\\____
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;____/\\\/__\/\\\____\/\\\_____\/\\\____/\\\/__\/\\\____
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/\\\\\\\\\\\\\\\\_\/\\\_____\/\\\__/\\\\\\\\\\\\\\\\_
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\///////////\\\//__\//\\\____/\\\__\///////////\\\//__
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________\/\\\_____\///\\\\\\\/_____________\/\\\____
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________\///________\///////_______________\///_____
          <br />
        </pre>
        <figcaption className="sr-only">
          ASCII art of a 404 error code
        </figcaption>
      </figure> */}

      <p>
        <Suspense>
          <FeedbackLink>Report an issue to the development team.</FeedbackLink>
        </Suspense>
      </p>
    </main>
  );
}
