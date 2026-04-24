import { Suspense } from 'react';
import { TaxMapDetails } from './TaxMapDetails';

export default function TaxMapDetailsPage(props: PageProps<'/taxmaps/[abbr]'>) {
  return (
    <main>
      <h1 className="mb-4 text-xl font-bold">TaxMap Downloads</h1>

      <Suspense>
        <TaxMapDetails {...props} />
      </Suspense>
    </main>
  );
}
