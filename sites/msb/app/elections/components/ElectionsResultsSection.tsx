import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElectionResultsList } from './ElectionResultsList';
import { LinkButton } from '@/components/static/LinkButton';
import { format } from 'date-fns';
import { DateTime } from '@/components/client/time';

const ElectionResultFragment = gql(`
  fragment ElectionResult on Election {
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

const ElectionResultsFragment = gql(`
    fragment ElectionResults on Query {
      electionResults(take: 5) {
        ...ElectionResultsList
      } 
    }
`);

export function ElectionResultsSection(props: {
  data?: FragmentType<typeof ElectionResultFragment> | null;
  results?: FragmentType<typeof ElectionResultsFragment> | null;
}) {
  const data = getFragmentData(ElectionResultFragment, props.data);
  const results = getFragmentData(ElectionResultsFragment, props.results);
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
              <DateTime date={data.electionDate} formatStr="PPP" />
            </span>
            .
          </p>
        )}
      </ProseWrapper>
      <ElectionResultsList data={results?.electionResults} />
      <div className="flex justify-center mt-4">
        <LinkButton href="/elections/results" color="primary">
          View All Results
        </LinkButton>
      </div>
    </PageBodySection>
  );
}
