import { Suspense } from 'react';
import { Button } from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServicesList } from '@/components/Services/ServicesList';
import { ServiceSearch } from '@/components/Services/ServiceSearch';
import { ServicesLoading } from '@/components/Services/ServicesLoading';
import { Metadata } from 'next';
import { PageProps } from '@/.next/types/app/page';

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
        left={<ServiceSearch search={searchParams.search} />}
        right={
          <div className="display-flex flex-column">
            <h3>Get Help</h3>
            <Button type="button" size="big">
              Contact us
            </Button>
          </div>
        }
      >
        <Suspense key={`${page}-${search}`} fallback={<ServicesLoading />}>
          <ServicesList page={pageNum} search={search || ''} />
        </Suspense>
      </ThreeColumnLayout>
    </section>
  );
}
