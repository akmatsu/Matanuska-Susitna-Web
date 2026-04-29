import { SearchField } from '@/components/SearchField';
import { PageTitle } from '@/components/PageTitle';
import { SearchResults } from './SearchResults';

export default function SearchPage() {
  return (
    <main>
      <PageTitle title="Parcel Search" />
      <SearchField />
      <SearchResults />
    </main>
  );
}
