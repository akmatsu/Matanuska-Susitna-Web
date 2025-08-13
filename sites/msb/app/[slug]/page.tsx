import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDistricts,
  PageDocuments,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const query = gql(`
  query GetTopicPage($slug: String) {
    topic(where: { slug: $slug }) {
      ...HeroImage
      ...PageBody
      publicNotices(take: 5 orderBy: { urgency: desc }) {
        ...PublicNoticeList
      }
      actions {
        ...ActionList
      }
      boards {
        ...PageList
      }
      contacts {
        ...ContactList
      }
      documents {
        ...DocumentList
      }
      trails {
        ...PageList
      }
      parks {
        ...PageList
      }
      events {
        id
      }
      orgUnits {
        ...PageList
      }
      facilities {
        ...FacilitiesList
      }
      districts {
        ...DistrictList
      }
      communities {
        ...PageList
      }
      services {
        ...ServiceList
      }
      plans {
        ...PageList
      }
    }
  }
`);

const metaQuery = gql(`
  query GetOrTopicMeta($slug: String) {
    topic(where: { slug: $slug }) {
      title
      description
    }
  }
`);

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { data } = await getClient().query({
    query: metaQuery,
    variables: {
      slug: params.slug,
    },
  });

  const topic = data.topic;

  return {
    title: topic ? topic.title : 'Page Not Found',
    description: topic
      ? topic.description
      : 'The page you are looking for does not exist.',
  };
}

export default async function page(props: Props) {
  const params = await props.params;

  const { data } = await getClient().query({
    query,
    variables: {
      slug: params.slug,
    },
  });

  const topic = data?.topic;

  if (!topic) return notFound();

  return (
    <PageContainer>
      <PageTwoColumn
        rightSide={
          <>
            <PageActions actions={topic.actions} />
            <PageDocuments documents={topic.documents} />
            <PageContacts contacts={topic.contacts} />
            <PageDistricts items={topic.districts} />
            <PageFacilities facilities={topic.facilities} />
            <PageListItems items={topic.trails} title="Trails" />
            <PageListItems items={topic.parks} title="Parks" />
            <PageListItems
              items={topic.orgUnits}
              title="Departments & Divisions"
            />
            <PageListItems items={topic.communities} title="Communities" />
            <PageListItems items={topic.plans} title="Plans" />
          </>
        }
      >
        <PageBody page={topic} />
        <PageServices services={topic.services} />
        <PagePublicNotices items={topic.publicNotices} />
        <PageListItems items={topic.boards} title="Boards" />
      </PageTwoColumn>
    </PageContainer>
  );
}
