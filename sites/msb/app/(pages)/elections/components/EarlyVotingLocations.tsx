import { PageSection } from '@/components/static/Page';
import { DataTable } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { format, subDays } from 'date-fns';

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
    </PageSection>
  );
}
