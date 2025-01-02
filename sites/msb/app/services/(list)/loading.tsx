import {
  SearchListInput,
  SearchListLoading,
  ThreeColumnLayout,
} from '@/components';
import { Button } from '@matsugov/ui';

export default function Loading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <ThreeColumnLayout
        left={<SearchListInput listKey="services" />}
        right={
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Get Help</h3>
            <Button big>Contact us</Button>
          </div>
        }
      >
        <SearchListLoading title="Services" />
      </ThreeColumnLayout>
    </section>
  );
}
