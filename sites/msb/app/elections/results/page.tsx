import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { ElectionSearch } from './components/ElectionSearch';

export default function ResultsPage() {
  return (
    <PageContainer size="md">
      <ProseWrapper>
        <h1>Elections Results</h1>
      </ProseWrapper>
      <ElectionSearch />
    </PageContainer>
  );
}
