import { PageContainer } from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { ElectionPageHeader } from './components/ElectionPageHeader';
import { Hero } from '@matsugov/ui';
import { ElectionPageQuickLinks } from './components/ElectionPageQuickLinks';
import { UpcomingElectionDetails } from './components/UpcomingElectionDetails';
import { ElectionVoterInformation } from './components/ElectionVoterInformation';
import { CandidateFilingInfo } from './components/CandidateFilingInfo';
import { ElectionPollingPlaces } from './components/ElectionPollingPlaces';
import { CandidateInfo } from './components/CandidateInfo';
import { ElectionPageContact } from './components/ElectionPageContact';
import { ElectionOfficialsInfo } from './components/ElectionsOfficialsInfo';
import { ElectionResultsSection } from './components/ElectionsResultsSection';

const getElections = gql(`
  query GetElections {
    electionsPage {
      heroImage
      ...ElectionPageHeader
      ...ElectionPollingPlaces
      ...ElectionContact
      ...ElectionOfficialContact
    }
    elections(take: 2, orderBy:  {
      electionDate: desc
    }) {
      ...ElectionPageQuickLinks
      ...UpcomingElectionDetails
      ...ElectionVoterInformation
      ...CandidateFilingInfo
      ...CandidateInfo
      ...ElectionsOfficialsInfo
      ...ElectionResults
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

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer size="md">
        <ElectionPageHeader data={page} />
        <ElectionPageQuickLinks data={currentElection} />
        <UpcomingElectionDetails data={currentElection} />
        <ElectionOfficialsInfo data={currentElection} contactData={page} />
        <ElectionVoterInformation data={currentElection} />
        <ElectionPollingPlaces />
        <CandidateFilingInfo data={currentElection} />
        <CandidateInfo data={currentElection} />
        <ElectionPageContact data={page} />
        <ElectionResultsSection data={currentElection} />
      </PageContainer>
    </>
  );
}
