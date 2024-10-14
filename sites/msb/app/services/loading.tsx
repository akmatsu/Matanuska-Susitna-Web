import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServiceSearch } from '@/components/Services/ServiceSearch';
import { Button } from '@trussworks/react-uswds';
import { ServicesLoading } from '@/components/Services/ServicesLoading';

export default function Loading() {
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
        <ServicesLoading />
      </ThreeColumnLayout>
    </section>
  );
}
