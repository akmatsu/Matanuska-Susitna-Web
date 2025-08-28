import { InstantSearch } from '@/components/client/search/InstantSearch';
import { PageContainer } from '@/components/static/Page/PageContainer';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <PageContainer size="lg" breakPoint="lg">
      <InstantSearch />
    </PageContainer>
  );
}
