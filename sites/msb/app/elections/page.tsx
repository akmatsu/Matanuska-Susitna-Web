import { PageContainer } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
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
import { PageViewTracker } from '@/components/client/PageViewTracker';
import { getClientHandler } from '@/utils/apollo/utils';
import { EarlyVotingLocations } from './components/EarlyVotingLocations';
import { BallotPropositions } from './components/BallotPropositions';

const getElections = gql(`
  query GetElections {
    ...ElectionResults
    ...GetAbsenteeVotingInfo
    ...GetEarlyVotingLocations
    ...Election_BallotPropositions
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
  const { data } = await getClientHandler({
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
      <PageContainer size="md" breakPoint="sm" hideBreadcrumbs>
        <div className="flex flex-col gap-16 col-span-5 md:col-span-3">
          <div>
            <ElectionPageHeader data={page} />
            <ElectionPageQuickLinks data={currentElection} />
          </div>
          <UpcomingElectionDetails data={currentElection} />
          <ElectionVoterInformation data={currentElection} />
          <ElectionOfficialsInfo data={currentElection} contactData={page} />
          <CandidateFilingInfo data={currentElection} />
          <AbsenteeVotingInfo data={data} />
          <EarlyVotingLocations data={data} />
          <ElectionPollingPlaces data={page} />
          <BallotPropositions data={data} />
          <ElectionResultsSection data={currentElection} results={data} />
          <ElectionPageContact data={page} />
        </div>
      </PageContainer>
      <PageViewTracker pageId="1" pageType="ElectionsPage" />
    </>
  );
}
