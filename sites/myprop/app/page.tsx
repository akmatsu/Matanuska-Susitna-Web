import { PageTitle } from '@/components/PageTitle';
import { PropertyAccessNotice } from '@/components/PropertyAccessNotice';
import { SearchField } from '@/components/SearchField';
import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <PageTitle title="MyProperty" />
      <div className="mb-6">
        <PropertyAccessNotice />
      </div>
      <SearchField />

      <p className="mb-8 inline-block w-full text-center">
        Looking for DXF & PDF TaxMaps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
    </main>
  );
}
