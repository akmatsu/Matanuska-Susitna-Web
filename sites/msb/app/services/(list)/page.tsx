import { Suspense } from 'react';
import { Button } from '@matsugov/ui';
import { Metadata } from 'next';
import { PageProps } from '@/.next/types/app/page';
import { GET_SERVICES_QUERY } from '@msb/js-sdk';
import {
  SearchList,
  SearchListInput,
  SearchListLoading,
  ThreeColumnLayout,
} from '@/components';

export const metadata: Metadata = {
  title: 'MSB - Services',
  description: 'Services offered by the Matanuska-Susitna Borough',
};

export default async function Services(props: PageProps) {
  const searchParams = await props.searchParams;
  const { page = '1', search = '' }: { page?: string; search?: string } =
    searchParams;

  const pageNum = parseInt(page);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <ThreeColumnLayout
        left={<SearchListInput search={search} />}
        right={
          <div className="display-flex flex-column">
            <h3 className="text-2xl font-bold mb-4">Get Help</h3>
            <Button big>Contact us</Button>
          </div>
        }
      >
        <Suspense
          key={`${page}-${search}`}
          fallback={<SearchListLoading title="Services" />}
        >
          <SearchList
            page={pageNum}
            search={search || ''}
            listKey="services"
            title="Services"
            query={GET_SERVICES_QUERY}
          />
        </Suspense>
      </ThreeColumnLayout>
    </section>
  );
}
