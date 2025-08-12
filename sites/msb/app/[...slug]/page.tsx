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
import { notFound, redirect } from 'next/navigation';

const query = gql(`
  query GetRedirectsOrTopic($path: String, $slug: String) {
    redirect(where: { from: $path }) {
      to {
        item {
          __typename
          ... on BasePageWithSlug {
            slug
          }
          ... on Url {
            url
          }
        }
      }
      redirectMessage
    }

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
  query GetRedirectOrTopicMeta($path: String, $slug: String) {
    redirect(where: { from: $path }) {
      id
    }

    topic(where: { slug: $slug }) {
      title
      description
    }
  }
`);

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const path = '/' + params.slug.join('/');
  const slug = params.slug.join('/');

  const { data } = await getClient().query({
    query: metaQuery,
    variables: {
      slug,
      path,
    },
  });

  const redirect = data.redirect;
  const topic = data.topic;

  return {
    title: topic ? topic.title : redirect ? 'Redirecting...' : 'Page Not Found',
    description: topic
      ? topic.description
      : redirect
        ? 'You are being redirected...'
        : 'The page you are looking for does not exist.',
  };
}

export default async function page(props: Props) {
  const params = await props.params;

  const { data } = await getClient().query({
    query,
    variables: {
      path: '/' + params.slug.join('/'),
      slug: params.slug.join('/'),
    },
  });

  const redirectInfo = data?.redirect;
  const topic = data?.topic;

  if (redirectInfo) {
    const redirectUrl =
      redirectInfo.to?.item?.__typename === 'Url'
        ? redirectInfo.to.item.url
        : redirectInfo.to?.item?.slug;

    if (redirectUrl) return redirect(redirectUrl);
  }

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
