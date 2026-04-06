import { Suspense } from 'react';
import { ParcelDetail } from './ParcelDetail';
import { ParcelDetailSkeleton } from './components/ParcelDetailFallback';

export default function MyParcelDetailPage(props: PageProps<'/parcels/[pid]'>) {
  return (
    <main>
      <div className="pt-6">
        <Suspense
          fallback={
            <div className="pt-6">
              <ParcelDetailSkeleton />
            </div>
          }
        >
          <ParcelDetail params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}
