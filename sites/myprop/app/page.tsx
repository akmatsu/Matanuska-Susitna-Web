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
          MyProperty&apos;s data. MyProperty is not going away but updates will
          pause on October 8, and resume after October 20.
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
