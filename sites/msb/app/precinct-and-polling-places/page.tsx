import { BasePage } from '@/components/static/BasePage';
import { PageListItems } from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';
import { PollingPlaces } from '@matsugov/ui/PollingPlaces';
import { ProseWrapper } from '@/components/static/ProseWrapper';

const metaQuery = gql(`
  query GetPrecinctMeta {
    topic(where: { slug: "precinct-and-polling-places" }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('topic', metaQuery, slug);
};

const query = gql(`
  query GetPrecinct($now: DateTime!) {
    topic(where: { slug: "precinct-and-polling-places" }) {
      ...BasePageInfo 
      boards {
        ...PageList
      }
      trails {
        ...PageList
      }
      parks {
        ...PageList
      }
      facilities(orderBy:  {
         title: asc
      }) {
        ...FacilitiesList
      }            
    }
  }
`);

export default async function page() {
  const { data } = await getClientHandler({
    query,
    variables: {
      now: new Date().toISOString(),
    },
  });

  const topic = data?.topic;

  if (!topic) return notFound();

  return (
    <BasePage
      data={topic}
      rightSide={
        <>
          <PageFacilities facilities={topic.facilities} />
          <PageListItems items={topic.trails} title="Trails" />
          <PageListItems items={topic.parks} title="Parks" />
        </>
      }
    >
      <PageListItems items={topic.boards} title="Boards" />
      <ProseWrapper>
        <PollingPlaces />
      </ProseWrapper>
    </BasePage>
  );
}
