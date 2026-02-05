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
import { InitiativeAndReferendumProcess } from './components/InitiativeAndReferendumProcess';
import { SideNav } from '@/components/client/sideNav';
import { SideNavDrawer } from '@/components/client/SideNavDrawer';
import { PageColumnController } from '@/components/client/PageColumnController';

const metaQuery = gql(`
  query GetElectionsPageMeta {
    electionsPage {
      title
      description
    }
  }
`);

export async function generateMetadata() {
  try {
    const { data } = await getClientHandler({
      query: metaQuery,
    });
    return {
      title: `MSB - ${data?.electionsPage?.title || 'Elections'}`,
      description: data?.electionsPage?.description,
    };
  } catch (error: any) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    if (error.networkError?.result?.errors) {
      console.error(
        'Network error: ',
        JSON.stringify(error.networkError.result.errors, null, 2),
      );
    }

    throw error;
  }
}

const getElections = gql(`
  query GetElections {
    ...GetAbsenteeVotingInfo
    ...GetEarlyVotingLocations
    ...Election_BallotPropositions
    ...GetInitiativeAndReferendumProcess
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

  const page = data?.electionsPage;
  if (!page) {
    notFound();
  }

  const currentElection = data?.elections?.[0];

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageColumnController
        right={<ElectionPageQuickLinks data={currentElection} />}
      >
        <SideNavDrawer />
        <ElectionPageHeader data={page} />
        <div className="lg:hidden">
          <ElectionPageQuickLinks data={currentElection} />
        </div>
        <UpcomingElectionDetails data={currentElection} />
        <ElectionVoterInformation data={currentElection} />
        <ElectionOfficialsInfo data={currentElection} contactData={page} />
        <CandidateFilingInfo data={currentElection} />
        <AbsenteeVotingInfo data={data} />
        {/* Hidden temporarily until we confirm times and location for DOE */}
        {/* <EarlyVotingLocations data={data} /> */}
        <ElectionPollingPlaces data={page} />
        <InitiativeAndReferendumProcess data={data} />
        <BallotPropositions data={data} />
        <ElectionResultsSection data={currentElection} />
        <ElectionPageContact data={page} />
      </PageColumnController>
      <PageViewTracker pageId="1" pageType="ElectionsPage" />
    </>
  );
}
