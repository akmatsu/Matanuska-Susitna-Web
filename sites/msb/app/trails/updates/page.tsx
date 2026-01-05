import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getTrailUpdates } from './utils';
import { TrailsUpdateSearchFilters } from './SearchFilters';
import { LinkButton } from '@/components/static/LinkButton';
import { TrailReportCard } from './components/TrailReportCard';

export default async function TrailsUpdatesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const maintainer = Array.isArray(searchParams.maintainer)
    ? searchParams.maintainer[0]
    : searchParams.maintainer;

  const query = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query;

  const date = Array.isArray(searchParams.date)
    ? searchParams.date[0]
    : searchParams.date;

  const data = await getTrailUpdates({ maintainer, query, date });

  return (
    <PageContainer size="lg" breakPoint="sm">
      <ProseWrapper>
        <h1>Trail Updates</h1>
        <LinkButton
          href="https://experience.arcgis.com/experience/5af9eaa929f8452fbc6c0d344ee717d3/page/Winter-Trail-Grooming"
          color="primary"
          className="not-prose"
        >
          Winter Trail Grooming Map
        </LinkButton>
        <p>
          See winter grooming reports here, submitted weekly by our Trail Care
          Partners.
        </p>

        <div className="mb-4 not-prose">
          <TrailsUpdateSearchFilters />
        </div>
        <ul className="space-y-4 not-prose">
          {data.features?.length ? (
            data.features?.map(({ attributes }) => (
              <TrailReportCard data={attributes} key={attributes.objectid} />
            ))
          ) : (
            <p>No trail updates found.</p>
          )}
        </ul>
      </ProseWrapper>
    </PageContainer>
  );
}
