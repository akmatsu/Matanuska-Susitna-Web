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
      <p className="font-semibold">Looks like something went wrong.</p>
      <p className="bg-surface rounded p-2">
        <code>{error.message}</code>
      </p>
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
