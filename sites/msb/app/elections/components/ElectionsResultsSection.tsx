import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { formatDate } from '@/utils/datetimehHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionResultsFragment = gql(`
  fragment ElectionResults on Election {
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

export function ElectionResultsSection(props: {
  data?: FragmentType<typeof ElectionResultsFragment> | null;
}) {
  const data = getFragmentData(ElectionResultsFragment, props.data);
  if (!data) {
    return null;
  }

  return (
    <PageBodySection title="Election Results">
      <ProseWrapper>
        {data.result?.document ? (
          <>
            <p>
              The {data.result.isOfficial ? 'official' : 'unofficial'} results
              of {data.result.document.title} are now available.
            </p>
            <DocumentLinkButton data={data.result.document} />
          </>
        ) : (
          <p>
            The results of {data.title} will be posted after the elections takes
            place on{' '}
            <span className="font-semibold">
              {formatDate(data.electionDate, { hideTime: true })}
            </span>
            .
          </p>
        )}
      </ProseWrapper>
    </PageBodySection>
  );
}
