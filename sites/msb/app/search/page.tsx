import { InstantSearch } from '@/components/client/search/InstantSearch';
import { PageContainer } from '@/components/server';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <PageContainer>
      <InstantSearch />
    </PageContainer>
  );
}
