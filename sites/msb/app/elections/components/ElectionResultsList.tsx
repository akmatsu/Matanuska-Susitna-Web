import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { DataTable } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionResultsListFragment = gql(`
  fragment ElectionResultsList on ElectionResult {
    id
    election {
      title
      electionDate
    }
    document {
      title
      ...DocumentLink
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
            key: 'election',
            label: 'Election',
            cell: (value, row) =>
              row.election?.title ||
              row.election?.electionDate ||
              document.title,
          },
          {
            key: 'document',
            label: 'Results',
            cell: (value, row) => (
              <DocumentLinkButton data={row.document}>View</DocumentLinkButton>
            ),
          },
        ]}
        noDataMessage="Elections results are not available at this time."
      />
    </div>
  );
}
