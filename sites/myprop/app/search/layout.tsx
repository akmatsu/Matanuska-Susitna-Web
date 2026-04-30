import { PageTitle } from '@/components/PageTitle';
import { SearchField } from '@/components/SearchField';

export default function SearchLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <PageTitle title="Parcel Search" />
      <SearchField />
      {props.children}
    </main>
  );
}
