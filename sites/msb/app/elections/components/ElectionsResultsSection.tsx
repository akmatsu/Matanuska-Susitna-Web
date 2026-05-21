import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElectionResultsList } from './ElectionResultsList';
import { LinkButton } from '@/components/static/LinkButton';
import { DateTime } from '@/components/client/DateTime';
import { PageSection } from '@/components/static/Page';
import { getClientHandler } from '@/utils/apollo/utils';

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

const getResults = gql(`
  query GetElectionResults {
    elections(take: 5, orderBy: { electionDate: desc }, where: {
      result: {
        document:  {
           title:  {
              contains: ""
           }
        }
      }
    }) {
      ...ElectionResultsList
    }
  }
`);

function normalizeDate(value: unknown): string | number | Date | undefined {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    return value;
  }
  return undefined;
}

export async function ElectionResultsSection(props: {
  data?: FragmentType<typeof ElectionResultFragment> | null;
}) {
  const data = getFragmentData(ElectionResultFragment, props.data);

  const results = await getClientHandler({
    query: getResults,
  });

  if (!data) {
    return null;
  }

  return (
    <PageSection title="Election Results" headerSize="lg">
      <ProseWrapper>
        {data.result?.document ? (
          <>
            <p>
              The {data.result.isOfficial ? 'official' : 'unofficial'} results
              of {data.result.document.title} are now available.
            </p>
            <DocumentLinkButton
              data={data.result.document}
              className="not-prose"
              color="primary"
            />
          </>
        ) : (
          <p>
            The results of {data.title} will be posted after the elections takes
            place on{' '}
            <span className="font-semibold">
              <DateTime
                date={normalizeDate(data.electionDate)}
                formatStr="PPP"
              />
            </span>
            .
          </p>
        )}
      </ProseWrapper>
      <ElectionResultsList data={results.data?.elections} />
      <div className="mt-4 flex justify-center">
        <LinkButton href="/elections/results" color="primary">
          View All Results
        </LinkButton>
      </div>
    </PageSection>
  );
}
