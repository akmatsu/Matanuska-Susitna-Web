import { Suspense } from 'react';
import { ParcelDetail } from './ParcelDetail';

export default function MyParcelDetailPage(props: PageProps<'/parcels/[pid]'>) {
  return (
    <main>
      <div className="pt-6">
        <Suspense
          fallback={
            <div className="pt-6 text-center">Loading parcel details...</div>
          }
        >
          <ParcelDetail params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}
