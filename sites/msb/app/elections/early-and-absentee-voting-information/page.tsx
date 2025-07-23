import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { DataTable } from '@matsugov/ui';
import { gql } from '@msb/js-sdk/gql';
import { getClient } from '@/utils/apollo/ApolloClient';
import notFound from '@/app/not-found';
import { formatDate } from '@/utils/datetimehHelpers';
import { PhoneLink } from '@/components/static/PhoneLink';
import { format, subDays } from 'date-fns';
import { DocumentLinkButton } from '@/components/static/DocumentLink';

const GetAbsenteeVotingInfo = gql(`
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
      earlyVotingLocations(orderBy:  {
         order: asc
      }) {
        order
        title
        address {
          lineOne
          lineTwo
          city
          state
          zip
        }
        hours {
          id
          day
          open
          close
        }
      }

    }
    elections(take: 1, orderBy: { electionDate: desc}) {
      earlyVotingStartDate
      electionDate
      absenteeVotingApplication {
        ...DocumentLink
      }
      absenteeApplicationDeadline
    }
  }
`);

export default async function AbsenteeVotingPage() {
  const { data } = await getClient().query({ query: GetAbsenteeVotingInfo });
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
            <DocumentLinkButton
              data={currentElection?.absenteeVotingApplication}
              big
              block
              color="primary"
            >
              Apply for Absentee By-Mail Ballot
            </DocumentLinkButton>
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
                Apply early to receive your Borough ballot in a timely manner
              </li>
              <li>Carefully complete ALL sections of the application</li>
              <li>Omissions or errors may cause a delay in ballot mailing</li>
              <li>
                Application MUST contain the applicant&apos;s signature; no one
                else may sign for you!
              </li>
            </ul>
          </blockquote>
          <p>
            Ballot envelopes must be postmarked by Election Day, and received in
            the mail by the Borough Clerk&apos;s Office no later than three
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
            {formatDate(currentElection?.earlyVotingStartDate, {
              hideTime: true,
            })}
            , and continue through Monday, November 3, 2025, at the following
            locations and times:
          </p>
          <h2>Early Voting Locations</h2>
        </ProseWrapper>
        {page?.earlyVotingLocations && (
          <DataTable
            data={page.earlyVotingLocations}
            columns={[
              {
                key: 'title',
                label: 'Location',
              },
              {
                key: 'address',
                label: 'Address',
                cell: (_, row) =>
                  row.address && (
                    <span>
                      {row.address.lineOne},{' '}
                      {row.address.lineTwo && `${row.address.lineTwo}, `}
                      {row.address.city}, {row.address.state} {row.address.zip}
                    </span>
                  ),
              },
              {
                key: 'hours',
                label: 'Hours',
                cell: (_, row) =>
                  row.hours?.length ? (
                    row.hours.map((hour) => (
                      <div key={hour.id}>
                        <span className="font-semibold">{hour.day}</span>:{' '}
                        {hour.open && (
                          <span>
                            {format(
                              new Date().setHours(
                                +hour.open.split(':')[0],
                                +hour.open.split(':')[1],
                              ),
                              'h:mm a',
                            )}
                          </span>
                        )}{' '}
                        -{' '}
                        {hour.close && (
                          <span>
                            {format(
                              new Date().setHours(
                                +hour.close.split(':')[0],
                                +hour.close.split(':')[1],
                              ),
                              'h:mm a',
                            )}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      <span className="font-semibold">
                        {format(
                          currentElection?.earlyVotingStartDate,
                          'MMM d, yyyy',
                        )}{' '}
                        -{' '}
                        {format(
                          subDays(currentElection?.electionDate, 1),
                          'MMM d, yyyy',
                        )}
                      </span>
                      : <span>Normal business hours</span>
                    </>
                  ),
              },
            ]}
          />
        )}
      </PageTwoColumn>
    </PageContainer>
  );
}
