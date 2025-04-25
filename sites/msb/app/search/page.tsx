import { PageContainer } from '@/components/PageContainer';
import { InstantSearch } from './components/InstantSearch';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <PageContainer>
      <InstantSearch />
    </PageContainer>
  );
}
