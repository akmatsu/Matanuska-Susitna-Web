'use client';
import { PageTitle } from '@/components/PageTitle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFoundPage() {
  const pathname = usePathname();
  return (
    <main className="space-y-4 text-center">
      <PageTitle title="Page Not Found" />
      <pre
        className="mx-auto w-fit max-w-full text-left font-mono text-[clamp(0.5rem,1.6vw,1rem)] leading-none whitespace-pre"
        aria-hidden="true"
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
      <p>This page either doesn&apos;t exist or has moved.</p>

      <p>
        <Link href="/">Go Home</Link>
      </p>

      <p>
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href={`https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=${pathname}`}
        >
          Report an issue to the development team.
        </Link>
      </p>
    </main>
  );
}
