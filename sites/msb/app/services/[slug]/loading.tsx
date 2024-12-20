import 'react-loading-skeleton/dist/skeleton.css';
import { ThreeColumnLayout } from '@/components';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={
          <nav>
            <Skeleton width="100" count={6}></Skeleton>
          </nav>
        }
        right={
          <>
            <ul className="usa-list--unstyled display-flex flex-column">
              <Skeleton height={50} width="100%" className="margin-bottom-1" />
              <Skeleton height={100} width="100%" className="margin-bottom-1" />
              <Skeleton height={100} width="100%" className="margin-bottom-1" />
            </ul>
          </>
        }
      >
        <h1>
          <Skeleton width="60%"></Skeleton>
        </h1>
        <Skeleton width="100%" count={8}></Skeleton>
        <h2>
          <Skeleton width="30%"></Skeleton>
        </h2>
        <Skeleton width="100%" count={4}></Skeleton>
        <Skeleton></Skeleton>
        <h2>
          <Skeleton width="50%"></Skeleton>
        </h2>
        <Skeleton width="100%" count={5}></Skeleton>
        <Skeleton></Skeleton>
      </ThreeColumnLayout>
    </section>
  );
}
