import { Link } from '@/components/static/Link';
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
      title
      file {
        url
      }
    }

    electionBallots {
      id
      title
      file {
        url
      }
    }

    propositions {
      id
      title
      file {
        url
      }
    }

    candidates {
      id
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
                label={
                  <>
                    {doc.label}{' '}
                    <span className="icon-[mdi--chevron-down] size-4 ml-2" />
                  </>
                }
                items={doc.value.map((item) => {
                  if (!item.file?.url) return null;
                  return (
                    <Link
                      key={item.title || item.id}
                      href={item.file?.url}
                      target="_blank"
                      className="hover:bg-primary-lighter block w-full rounded px-4 py-2"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              />
            );
          } else {
            if (!doc.value.file?.url) return null;
            return (
              <LinkButton
                key={index}
                href={doc.value.file?.url}
                target="_blank"
              >
                {doc.label}
              </LinkButton>
            );
          }
        })}
      </div>
    </PageBodySection>
  );
}

function DocumentLink() {}
