import { PageTitle } from '@/components/PageTitle';

export default function TaxmapPageLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <PageTitle title="TaxMap Downloads" />
      {props.children}
    </main>
  );
}
