import { PageContainer } from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound, redirect } from 'next/navigation';
import { ElectionPageHeader } from './components/ElectionPageHeader';
import { Hero } from '@matsugov/ui';
import { ElectionPageQuickLinks } from './components/ElectionPageQuickLinks';
import { UpcomingElectionDetails } from './components/UpcomingElectionDetails';
import { ElectionVoterInformation } from './components/ElectionVoterInformation';
import { CandidateFilingInfo } from './components/CandidateFilingInfo';
import { ElectionPollingPlaces } from './components/ElectionPollingPlaces';
import { ElectionPageContact } from './components/ElectionPageContact';
import { ElectionOfficialsInfo } from './components/ElectionsOfficialsInfo';
import { ElectionResultsSection } from './components/ElectionsResultsSection';
import { AbsenteeVotingInfo } from './components/AbsenteeVotingInfo';
import { auth } from '@/auth';

const getElections = gql(`
  query GetElections {
    ...ElectionResults
    ...GetAbsenteeVotingInfo
    electionsPage {
      heroImage
      ...ElectionPageHeader
      ...ElectionPollingPlaces
      ...ElectionContact
      ...ElectionOfficialContact
    }
    elections(take: 1, orderBy:  {
      electionDate: desc
    }) {
      ...ElectionPageQuickLinks
      ...UpcomingElectionDetails
      ...ElectionVoterInformation
      ...CandidateFilingInfo
      ...ElectionsOfficialsInfo
      ...ElectionResult
    }
  }
`);

export default async function ElectionsPage() {
  const session = await auth();
  if (!session?.user) redirect('https://matsugov.us/elections');

  const { data } = await getClient().query({
    query: getElections,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const page = data.electionsPage;
  if (!page) {
    notFound();
  }

  const currentElection = data.elections?.[0];

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer size="md" hideBreadcrumbs>
        <ElectionPageHeader data={page} />
        <ElectionPageQuickLinks data={currentElection} />
        <UpcomingElectionDetails data={currentElection} />
        <ElectionVoterInformation data={currentElection} />
        <ElectionOfficialsInfo data={currentElection} contactData={page} />
        <CandidateFilingInfo data={currentElection} />
        <AbsenteeVotingInfo data={data} />

        <ElectionPollingPlaces data={page} />
        <ElectionResultsSection data={currentElection} results={data} />
        <ElectionPageContact data={page} />
      </PageContainer>
    </>
  );
}
