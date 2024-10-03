import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServicesList } from '@/components/ServicesList';
import { Button } from '@trussworks/react-uswds';
import { ServiceSearch } from '@/components/ServiceSearch';

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
        <ServicesList />
      </ThreeColumnLayout>
    </section>
  );
}
