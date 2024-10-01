import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { ServicesList } from '@/components/ServicesList';

export default async function Services() {
  return (
    <section className="usa-section">
      <ThreeColumnLayout centerCol={<ServicesList />} />
    </section>
  );
}
