import { PageSection } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const UpcomingElectionDetailsFragment = gql(`
  fragment UpcomingElectionDetails on Election {
    electionDate
    candidateFilingStartDate
    candidateFilingDeadline
    earlyVotingStartDate
    absenteeApplicationDeadline
    voterRegistrationDeadline

    electionBrochure {
      title
      file {
        url
      }
    }

    electionBallots {
      title
      file {
        url
      }
    }

    propositions {
      title
      file {
        url
      }
    }

    candidates {
      title
      file {
        url
      }
    }
  }
`);

export function UpcomingElectionDetails(props: {
  data?: FragmentType<typeof UpcomingElectionDetailsFragment> | null;
}) {
  const data = getFragmentData(UpcomingElectionDetailsFragment, props.data);
  if (!data) return null;

  function formatDate(date: string) {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  }

  const tableValues = [
    {
      label: 'Election Date',
      value: data.electionDate ? formatDate(data.electionDate) : 'TBD',
    },
    {
      label: 'Candidate Filing Period',
      value:
        data.candidateFilingStartDate && data.candidateFilingDeadline
          ? `${formatDate(data.candidateFilingStartDate)} - ${formatDate(data.candidateFilingDeadline)}`
          : 'TBD',
    },
    {
      label: 'Early Voting Begins',
      value: data.earlyVotingStartDate
        ? formatDate(data.earlyVotingStartDate)
        : 'TBD',
    },
    {
      label: 'Absentee Application Deadline',
      value: data.absenteeApplicationDeadline
        ? formatDate(data.absenteeApplicationDeadline)
        : 'TBD',
    },
    {
      label: 'Voter Registration Deadline',
      value: data.voterRegistrationDeadline
        ? formatDate(data.voterRegistrationDeadline)
        : 'TBD',
    },
  ];

  return (
    <PageSection title="Upcoming Election Details">
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
