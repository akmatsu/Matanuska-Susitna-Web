import { SearchResults } from './SearchResults';

import { SearchField } from '@/components/SearchField';
import { PageTitle } from '@/components/PageTitle';

export default async function SearchPage() {
  return (
    <main>
      <PageTitle title="Parcel Search" />
      <SearchField />

      <SearchResults />
    </main>
  );
}
