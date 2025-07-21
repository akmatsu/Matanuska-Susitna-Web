import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { Button, PhoneLink } from '@matsugov/ui';
import { gql } from '@msb/js-sdk/gql';
import { getClient } from '@/utils/apollo/ApolloClient';
import notFound from '@/app/not-found';
import { formatDate } from '@/utils/datetimehHelpers';

const getAbsenteeVotingInfo = gql(`
  query getAbsenteeVotingInfo {
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
      absenteeApplicationDeadline
      absenteeVotingApplication {
        ...DocumentLink
      }
    }
  }
`);

export default async function AbsenteeVotingPage() {
  const { data } = await getClient().query({ query: getAbsenteeVotingInfo });
  if (!data) {
    notFound();
  }

  const currentElection = data.elections?.[0];
  const page = data.electionsPage;

  return (
    <PageContainer>
      <PageTwoColumn
        rightSide={
          <>
            <Button big block color="primary">
              I'm a button
            </Button>
          </>
        }
      >
        <ProseWrapper>
          <h1>Early/Absentee Voting Information</h1>
          <p>
            Any registered voter of the Borough may apply for a ballot to be
            mailed to them by submitting an Absentee By-Mail Ballot Application
            not later than seven days prior to Election Day.
          </p>
          <p>
            <strong>
              Please note: The Borough's absentee by-mail application is
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
                Apply early to receive your Borough ballot in a timely manner
              </li>
              <li>Carefully complete ALL sections of the application</li>
              <li>Omissions or errors may cause a delay in ballot mailing</li>
              <li>
                Application MUST contain the applicant's signature; no one else
                may sign for you!
              </li>
            </ul>
          </blockquote>
          <p>
            Ballot envelopes must be postmarked by Election Day, and received in
            the mail by the Borough Clerk's Office no later than three calendar
            days after the election. Hand-delivered ballots must be returned to
            a Borough election official by 8 p.m. on Election Day.
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
            {formatDate(currentElection?.earlyVotingStartDate, {
              hideTime: true,
            })}
            , and continue through Monday, November 3, 2025, at the following
            locations and times:
          </p>
        </ProseWrapper>
      </PageTwoColumn>
    </PageContainer>
  );
}
