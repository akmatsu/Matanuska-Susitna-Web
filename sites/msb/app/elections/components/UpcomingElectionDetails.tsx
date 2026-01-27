import { DateTime } from '@/components/client/DateTime';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageSection } from '@/components/static/Page';

const UpcomingElectionDetailsFragment = gql(`
  fragment UpcomingElectionDetails on Election {
    electionDate
    candidateFilingStartDate
    candidateFilingDeadline
    earlyVotingStartDate
    absenteeApplicationDeadline
    voterRegistrationDeadline
  }
`);

export function UpcomingElectionDetails(props: {
  data?: FragmentType<typeof UpcomingElectionDetailsFragment> | null;
}) {
  const data = getFragmentData(UpcomingElectionDetailsFragment, props.data);
  if (!data) return null;

  const tableValues = [
    {
      label: 'Election Date',
      value: data.electionDate ? (
        <DateTime date={data.electionDate} formatStr="PPP" />
      ) : (
        'TBD'
      ),
    },
    {
      label: 'Candidate Filing Period',
      value:
        data.candidateFilingStartDate && data.candidateFilingDeadline ? (
          <>
            <DateTime date={data.candidateFilingStartDate} formatStr="PPPp" /> -{' '}
            <DateTime date={data.candidateFilingDeadline} formatStr="PPPp" />
          </>
        ) : (
          'TBD'
        ),
    },
    {
      label: 'Early Voting Begins',
      value: data.earlyVotingStartDate ? (
        <DateTime date={data.earlyVotingStartDate} formatStr="PPP" />
      ) : (
        'TBD'
      ),
    },
    {
      label: 'Absentee Application Deadline',
      value: data.absenteeApplicationDeadline ? (
        <DateTime date={data.absenteeApplicationDeadline} formatStr="PPP" />
      ) : (
        'TBD'
      ),
    },
    {
      label: 'Voter Registration Deadline',
      value: data.voterRegistrationDeadline ? (
        <DateTime date={data.voterRegistrationDeadline} formatStr="PPP" />
      ) : (
        'TBD'
      ),
    },
  ];

  return (
    <PageSection title="Upcoming Election Details" headerSize="lg">
      <ProseWrapper>
        <table>
          <tbody>
            {tableValues.map((item, index) => (
              <tr key={index}>
                <td className="bg-base-lightest font-bold">{item.label}</td>
                <td>{item.value ? item.value : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ProseWrapper>
    </PageSection>
  );
}
