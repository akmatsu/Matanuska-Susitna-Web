import { PageTitle } from '@/components/PageTitle';
import { SearchField } from '@/components/SearchField';
import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <PageTitle title="MyProperty" />
      <SearchField />

      <p className="mb-8 inline-block w-full text-center">
        Looking for DXF & PDF TaxMaps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
    </main>
  );
}
