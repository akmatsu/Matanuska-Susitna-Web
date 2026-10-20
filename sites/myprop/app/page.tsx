import { Notice } from '@/components/Notice';
import { PageTitle } from '@/components/PageTitle';
import { SearchField } from '@/components/SearchField';
import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <PageTitle title="MyProperty" />
      <div className="mb-6">
        <Notice>
          The Borough is upgrading the Tax &amp; Assessment system that supplies
          MyProperty&apos;s data. Updates are currently paused; we hope to
          restore updates by October 30.
        </Notice>
      </div>
      <SearchField />

      <p className="mb-8 inline-block w-full text-center">
        Looking for DXF & PDF TaxMaps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
    </main>
  );
}
