import { Suspense } from 'react';
import { PageProps } from '@/.next/types/app/page';
import { GET_COMMUNITIES_QUERY } from '@/utils/apollo/queries/getCommunities';
import { Button } from '@matsugov/ui';
import {
  SearchList,
  SearchListInput,
  SearchListLoading,
  ThreeColumnLayout,
} from '@/components';

export default function Communities({ searchParams }: PageProps) {
  const { page = '1', search = '' }: { page?: string; search?: string } =
    searchParams;

  const pageNum = parseInt(page);

  const pageTitle = 'Communities';

  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<SearchListInput search={search} />}
        right={
          <div className="display-flex flex-column">
            <h3>Get Help</h3>
            <Button big>Contact us</Button>
          </div>
        }
      >
        <Suspense
          key={`${page}-${search}`}
          fallback={<SearchListLoading title={pageTitle} />}
        >
          <SearchList
            page={pageNum}
            search={search || ''}
            listKey="communities"
            title={pageTitle}
            query={GET_COMMUNITIES_QUERY}
          />
        </Suspense>
      </ThreeColumnLayout>
    </section>
  );
}
