import {
  SearchListInput,
  SearchListLoading,
  ThreeColumnLayout,
} from '@/components';
import { Button } from '@matsugov/ui';

export default function Loading() {
  return (
    <section className="usa-section">
      <ThreeColumnLayout
        left={<SearchListInput />}
        right={
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h3>Get Help</h3>
            <Button big>Contact us</Button>
          </div>
        }
      >
        <SearchListLoading title="Services" />
      </ThreeColumnLayout>
    </section>
  );
}
