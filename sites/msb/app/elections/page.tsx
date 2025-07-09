import { PageContainer, PageSection } from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { ElectionPageHeader } from './components/ElectionPageHeader';
import { Hero } from '@matsugov/ui';
import { ElectionPageQuickLinks } from './components/ElectionPageQuickLinks';
import { UpcomingElectionDetails } from './components/UpcomingElectionDetails';

const getElections = gql(`
  query GetElections {
    electionsPage {
      heroImage
      ...ElectionPageHeader
      
    }
    elections(take: 2, orderBy:  {
      electionDate: desc
    }) {
      ...ElectionPageQuickLinks
      ...UpcomingElectionDetails
    }
  }
`);

export default async function ElectionsPage() {
  const { data } = await getClient().query({
    query: getElections,
  });

  const page = data.electionsPage;
  if (!page) {
    notFound();
  }

  const currentElection = data.elections?.[0];
  const previousElection =
    data.elections?.length === 2 ? data.elections?.[1] : null;

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer>
        <ElectionPageHeader data={page} />
        <ElectionPageQuickLinks data={currentElection} />
        <UpcomingElectionDetails data={currentElection} />

        {/* Voter information and Resources */}
        {/* Polling places */}
        {/* Candidate resources */}
        {/* Elections Official information */}
        {/* Results */}
        {/* Contact */}
      </PageContainer>
    </>
  );
}
