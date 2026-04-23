import { Suspense } from 'react';
// import { TaxMapImageMap } from './TaxMapImageMap';
import { TaxMapMap } from './TaxmapMap';
import { TaxMapTable } from './TaxMapTable';

export default function TaxMapsPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">
          MSB Tax Map Viewer / DXF Downloads
        </h1>
        <Suspense>
          <TaxMapMap />
        </Suspense>
        {/* <Suspense>
          <TaxMapImageMap />
        </Suspense> */}

        <TaxMapTable />
      </div>
    </main>
  );
}
