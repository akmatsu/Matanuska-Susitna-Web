import { DateTime } from '@/components/client/DateTime';
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageSection } from '@/components/static/Page';
import { PhoneLink } from '@/components/static/PhoneLink';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { subDays } from 'date-fns';

const GetAbsenteeVotingInfo = gql(`
  fragment GetAbsenteeVotingInfo on Query {
    electionsPage {
      stateElectionContact {
        phone
        name
        ...ContactFields
      }
      boroughElectionContact {
        phone
        name
        ...ContactFields
      }
    }

    elections(take: 1, orderBy: { electionDate: desc}) {
      earlyVotingStartDate
      electionDate
      absenteeVotingApplication {
        ...DocumentLink
      }
      absenteeVotingBody
      absenteeApplicationDeadline
    }
  }
`);

export function AbsenteeVotingInfo(props: {
  data?: FragmentType<typeof GetAbsenteeVotingInfo> | null;
}) {
  const data = getFragmentData(GetAbsenteeVotingInfo, props?.data);

  const page = data?.electionsPage;
  const currentElection = data?.elections?.[0];
  if (!page) return null;

  return (
    <PageSection title="Absentee Voting Information" headerSize="lg">
      <ProseWrapper>
        {currentElection?.absenteeVotingBody ? (
          <MarkdownRenderer>
            {currentElection?.absenteeVotingBody}
          </MarkdownRenderer>
        ) : (
          <>
            <p>
              Any registered voter of the Borough may apply for a ballot to be
              mailed to them by submitting an Absentee By-Mail Ballot
              Application not later than seven days prior to Election Day.
            </p>
            <DocumentLinkButton
              data={currentElection?.absenteeVotingApplication}
              color="primary"
              className="not-prose"
            />
            <p>
              <strong>
                Please note: The Borough&apos;s absentee by-mail application is
                separate from that of the Alaska State Division of Elections and
                the cities of Houston, Palmer, and Wasilla.
              </strong>
            </p>
            <blockquote className="bg-green-100 border-l-green-500 rounded not-italic">
              <h3 className="mt-0">
                Things applicants need to know about the process
              </h3>
              <ul>
                <li>
                  Apply early to receive your Borough ballot in a timely manner;
                </li>
                <li>Carefully complete ALL sections of the application;</li>
                <li>
                  Omissions or errors may cause a delay in ballot mailing; and
                </li>
                <li>
                  Application MUST contain the applicant&apos;s signature; no
                  one else may sign for you!
                </li>
              </ul>
            </blockquote>
            <p>
              Once the ballots are ready for distribution and upon timely
              receipt of an application, the official ballot and voting material
              will be mailed to the applicant at the ballot mailing address
              provided on the application. Upon receiving the ballot, applicants
              need to carefully follow <strong>ALL</strong> instructions to
              ensure that the ballot is properly cast.
            </p>
            <p>
              Ballot envelopes must be postmarked by Election Day, and received
              in the mail by the Borough Clerk&apos;s Office no later than three
              calendar days after the election. Hand-delivered ballots must be
              returned to a Borough election official by 8 p.m. on Election Day.
            </p>
            <p>
              The Voting Locations section contains precinct information, or if
              you have questions, please call our office at{' '}
              <PhoneLink phoneNumber={page?.boroughElectionContact?.phone} /> or
              the {page?.stateElectionContact?.name} at{' '}
              <PhoneLink phoneNumber={page?.stateElectionContact?.phone} />.
            </p>
            <p>
              Early/Absentee In-Person voting will begin on{' '}
              <DateTime
                date={currentElection?.earlyVotingStartDate}
                formatStr="PPP"
              />
              , and continue through{' '}
              <DateTime
                date={subDays(new Date(currentElection?.electionDate), 1)}
                formatStr="PPP"
              />
              , at the following locations and times:
            </p>
          </>
        )}
      </ProseWrapper>
    </PageSection>
  );
}
