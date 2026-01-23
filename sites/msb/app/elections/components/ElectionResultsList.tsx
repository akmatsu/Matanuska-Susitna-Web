import { DocumentLink } from '@/components/static/DocumentLink';
import { DataTable } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionResultsListFragment = gql(`
  fragment ElectionResultsList on Election {
    title
    electionDate
    result {
      document {
        title
        ...DocumentLink
      }
      isOfficial
    }
  }
`);

export function ElectionResultsList(props: {
  data?: FragmentType<typeof ElectionResultsListFragment>[] | null;
}) {
  const data = getFragmentData(ElectionResultsListFragment, props.data);

  if (!data) {
    return null;
  }

  return (
    <div className="mt-4 not-prose">
      <DataTable
        data={data}
        columns={[
          {
            key: 'title',
            label: 'Election',
            cell: (value, row) => {
              return (
                row.title || row.electionDate || row.result?.document?.title
              );
            },
          },
          {
            key: 'result',
            label: 'Results',
            cell: (value, row) => (
              <DocumentLink data={row.result?.document}>View</DocumentLink>
            ),
          },
        ]}
        noDataMessage="Elections results are not available at this time."
      />
    </div>
  );
}
