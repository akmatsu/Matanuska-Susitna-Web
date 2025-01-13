import { Suspense } from 'react';
import { PageProps } from '@/.next/types/app/page';
import { GET_COMMUNITIES_QUERY } from '@msb/js-sdk/queries';
import { Button } from '@matsugov/ui';
import {
  SearchList,
  SearchListInput,
  SearchListLoading,
  ThreeColumnLayout,
} from '@/components';

export default async function Communities(props: PageProps) {
  const searchParams = await props.searchParams;
  const { page = '1', search = '' }: { page?: string; search?: string } =
    searchParams;

  const pageNum = parseInt(page);

  const pageTitle = 'Communities';

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <ThreeColumnLayout
        left={<SearchListInput search={search} listKey="communities" />}
        right={
          <div className="display-flex flex-column">
            <h3 className="text-2xl font-bold mb-4">Get Help</h3>
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
