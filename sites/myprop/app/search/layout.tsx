import { PageTitle } from '@/components/PageTitle';
import { PropertyAccessNotice } from '@/components/PropertyAccessNotice';

export default function SearchLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <PageTitle title="Search" />
      <PropertyAccessNotice className="mb-6" />
      {props.children}
    </main>
  );
}
