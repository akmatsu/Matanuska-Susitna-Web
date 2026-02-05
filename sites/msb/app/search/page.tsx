import { InstantSearch } from '@/components/client/search/InstantSearch';
import { PageContainer } from '@/components/static/Page/PageContainer';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'MSB - Search',
  description: 'Search the Matanuska-Susitna Borough website',
};

export default function SearchPage() {
  return (
    <PageContainer size="lg">
      <InstantSearch />
    </PageContainer>
  );
}
