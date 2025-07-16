import {
  DocumentLink,
  DocumentLinkButton,
} from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { formatDate } from '@/utils/datetimehHelpers';
import { DropdownButton } from '@matsugov/ui';
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
      id
      ...DocumentLink
    }

    electionBallots {
      id
      ...DocumentLink
    }

    propositions {
      id
      ...DocumentLink
    }

    candidates {
      id
      ...DocumentLink
    }
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

  const documents = [
    {
      label: 'Election Brochure',
      value: data.electionBrochure,
    },
    {
      label: 'Election Ballots',
      value: data.electionBallots,
    },
    {
      label: 'Propositions',
      value: data.propositions,
    },
    {
      label: 'Candidates',
      value: data.candidates,
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
      <div className="flex gap-4 justify-center flex-wrap my-4">
        {documents.map((doc, index) => {
          if (!doc.value) return null;
          if (Array.isArray(doc.value)) {
            if (doc.value.length === 0) return null;
            return (
              <DropdownButton
                key={index}
                label={doc.label}
                items={doc.value.map((item) => {
                  if (!item) return null;
                  return <DocumentLink data={item} key={item.id} />;
                })}
              />
            );
          } else {
            if (!doc.value) return null;
            return <DocumentLinkButton data={doc.value} key={doc.value.id} />;
          }
        })}
      </div>
    </PageBodySection>
  );
}
