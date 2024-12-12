import { Suspense } from 'react';
import { Button } from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { Metadata } from 'next';
import { PageProps } from '@/.next/types/app/page';
import { GET_SERVICES_QUERY } from '@/utils/apollo/queries/getServices';
import {
  SearchList,
  SearchListInput,
  SearchListLoading,
} from '@/components/search';

export const metadata: Metadata = {
  title: 'MSB - Services',
  description: 'Services offered by the Matanuska-Susitna Borough',
};

export default function Services({ searchParams }: PageProps) {
  const { page = '1', search = '' }: { page?: string; search?: string } =
    searchParams;

  const pageNum = parseInt(page);

  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<SearchListInput search={search} />}
        right={
          <div className="display-flex flex-column">
            <h3>Get Help</h3>
            <Button type="button" size="big">
              Contact us
            </Button>
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
