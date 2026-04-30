import { PageTitle } from '@/components/PageTitle';

export default function SearchLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <PageTitle title="Parcel Search" />
      {props.children}
    </main>
  );
}
