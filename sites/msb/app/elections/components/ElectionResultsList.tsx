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
    <div className="not-prose mt-4">
      <DataTable
        data={data}
        columns={[
          {
            key: 'title',
            label: 'Election',
            cell: (value, row) => {
              const title = row.title ? String(row.title) : '';
              const electionDate = row.electionDate
                ? String(row.electionDate)
                : '';
              const docTitle = row.result?.document?.title
                ? String(row.result.document.title)
                : '';
              return title || electionDate || docTitle || '';
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
