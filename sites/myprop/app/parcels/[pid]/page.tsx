import { Suspense } from 'react';
import { ParcelDetail } from './ParcelDetail';
import { ParcelDetailSkeleton } from './ParcelDetailFallback';

export default function MyParcelDetailPage(props: PageProps<'/parcels/[pid]'>) {
  return (
    <main>
      <div className="pt-6">
        <Suspense fallback={<ParcelDetailSkeleton />}>
          <ParcelDetail params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}
