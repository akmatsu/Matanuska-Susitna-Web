import { PageSection } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { DataTable } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { format, subDays } from 'date-fns';
import v from 'voca';

const GetEarlyVotingLocations = gql(`
  fragment GetEarlyVotingLocations on Query {
    electionsPage {
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

export function EarlyVotingLocations(props: {
  data?: FragmentType<typeof GetEarlyVotingLocations>;
}) {
  const data = getFragmentData(GetEarlyVotingLocations, props.data);
  const page = data?.electionsPage;
  const currentElection = data?.elections?.[0];
  if (!page?.earlyVotingLocations?.length) return null;
  return (
    <PageSection title="Early Voting Locations" headerSize="lg">
      <ProseWrapper>
        <DataTable
          data={page.earlyVotingLocations}
          columns={[
            {
              key: 'title',
              label: 'Location',
              cell: (_, row) => <span className="font-bold">{row.title}</span>,
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
                  <>
                    {row.hours.map((hour) => (
                      <div key={hour.id}>
                        <span className="font-semibold">
                          {hour.day === 'weekdays'
                            ? 'Monday - Friday'
                            : v.titleCase(hour.day || '')}
                          :
                        </span>{' '}
                        <span>
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
                        </span>
                      </div>
                    ))}
                    {row.hours.some((hour) => hour.day === 'weekdays') &&
                      row.hours.every((hour) => hour.day !== 'saturday') && (
                        <div>
                          <span className="font-semibold">Saturday:</span>{' '}
                          Closed
                        </div>
                      )}
                    {row.hours.some((hour) => hour.day === 'weekdays') &&
                      row.hours.every((hour) => hour.day !== 'sunday') && (
                        <div>
                          <span className="font-semibold">Sunday:</span> Closed
                        </div>
                      )}
                  </>
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

        <blockquote className="bg-green-100 border-l-green-500 rounded not-italic">
          <h3 className="mt-0">Voting Assistance</h3>
          <p className="before:content-none after:content-none">
            A touch screen voting unit will be available at the Mat-Su Borough
            Building at at the Divisions of Elections, Mat-Su Regional Office 15
            days prior to the election. Touch screen voting is intended for the
            blind, disabled, and voters with reading difficulties. The touch
            screen units allow disabled voters to vote unassisted with
            magnified, high contrast, and audio ballot.
          </p>
        </blockquote>
      </ProseWrapper>
    </PageSection>
  );
}
