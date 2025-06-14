import { PageMap } from '@/components/client/Page/PageMap';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDistricts,
  PageDocuments,
  PageEvents,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Hero } from '@matsugov/ui';
import { GET_COMMUNITY_QUERY } from '@msb/js-sdk/getCommunity';
import { notFound } from 'next/navigation';

export default async function CommunityPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query: GET_COMMUNITY_QUERY,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.community) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.community;
  const publicNotices = data.publicNotices;
  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageMap itemId={page.title} />
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
              <PageDistricts items={page.districts} />
            </>
          }
        >
          <PageBody
            title={page.title}
            description={page.description}
            body={page.body}
          />
          <PageServices services={page.services} />
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Community" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
