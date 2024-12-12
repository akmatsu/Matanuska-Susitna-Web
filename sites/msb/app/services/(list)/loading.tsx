import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { SearchListInput, SearchListLoading } from '@/components/search';
import { Button } from '@trussworks/react-uswds';

export default function Loading() {
  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<SearchListInput />}
        right={
          <div className="display-flex flex-column">
            <h3>Get Help</h3>
            <Button type="button" size="big">
              Contact us
            </Button>
          </div>
        }
      >
        <SearchListLoading title="Services" />
      </ThreeColumnLayout>
    </section>
  );
}
