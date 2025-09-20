import { DateTime } from '@/components/client/time';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { format } from 'date-fns';

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
        <DateTime date={data.electionDate} formatStr="PPPp" />
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
        <DateTime date={data.earlyVotingStartDate} formatStr="PPPp" />
      ) : (
        'TBD'
      ),
    },
    {
      label: 'Absentee Application Deadline',
      value: data.absenteeApplicationDeadline ? (
        <DateTime date={data.absenteeApplicationDeadline} formatStr="PPPp" />
      ) : (
        'TBD'
      ),
    },
    {
      label: 'Voter Registration Deadline',
      value: data.voterRegistrationDeadline ? (
        <DateTime date={data.voterRegistrationDeadline} formatStr="PPPp" />
      ) : (
        'TBD'
      ),
    },
  ];

  return (
    <PageBodySection title="Upcoming Election Details">
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
    </PageBodySection>
  );
}
