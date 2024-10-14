'use client';
import { Suspense } from 'react';
import { Button } from '@trussworks/react-uswds';
import { usePageParam } from '@/hooks/usePageParam';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServicesList } from '@/components/Services/ServicesList';
import { ServiceSearch } from '@/components/Services/ServiceSearch';
import { ServicesLoading } from '@/components/Services/ServicesLoading';

export default async function Services() {
  const { page, search } = usePageParam();

  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<ServiceSearch search={search} />}
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
          <ServicesList page={page} search={search || ''} />
        </Suspense>
      </ThreeColumnLayout>
    </section>
  );
}
