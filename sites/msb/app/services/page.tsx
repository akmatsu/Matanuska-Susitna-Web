import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServicesList, ServicesListLoading } from '@/components/ServicesList';
import { Button } from '@trussworks/react-uswds';
import { ServiceSearch } from '@/components/ServiceSearch';
import { Suspense } from 'react';

export default async function Services() {
  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<ServiceSearch />}
        right={
          <div className="display-flex flex-column">
            <h3>Get Help</h3>
            <Button type="button" size="big">
              Contact us
            </Button>
          </div>
        }
      >
        <Suspense fallback={<ServicesListLoading />}>
          <ServicesList />
        </Suspense>
      </ThreeColumnLayout>
    </section>
  );
}
