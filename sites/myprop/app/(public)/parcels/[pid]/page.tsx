import { Suspense } from 'react';
import { ParcelDetail } from './ParcelDetail';

export default function MyParcelDetailPage(props: PageProps<'/parcels/[pid]'>) {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">Parcel Detail</h1>
        <Suspense
          fallback={
            <div className="p-6 text-center">Loading parcel details...</div>
          }
        >
          <ParcelDetail params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}
