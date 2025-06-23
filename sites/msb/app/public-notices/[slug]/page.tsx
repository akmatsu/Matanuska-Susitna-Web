import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageListItems,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';

const getPage = gql(`
  query GetPublicNotice($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      ...HeroImage
      ...PageBody
      contacts {
        ...ContactFields
      }
      documents {
        ...DocumentFields
      }
      actions {
        ...ActionFields
      }
      topics {
        ...PageList
      }
      communities {
        ...PageList
      }
      assemblyDistricts {
        ...PageList
      }
      parks {
        ...PageList
      }
      facilities {
        ...PageList
      }
      trails {
        ...PageList
      }
      orgUnits {
        ...PageList
      }
      boards {
        ...PageList
      }
      services {
        ...ServiceFields
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: getPage,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.publicNotice;

  if (!page) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  return (
    <>
      <PageHeroImage page={page} />
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />

              <PageListItems items={page.facilities} title="Facilities" />
              <PageListItems items={page.parks} title="Parks" />
              <PageListItems items={page.trails} title="Trails" />
              <PageListItems items={page.boards} title="Boards" />
              <PageListItems
                items={page.orgUnits}
                title="Departments & Divisions"
              />
              <PageListItems
                items={page.assemblyDistricts}
                title="Assembly Districts"
              />
              <PageListItems items={page.topics} title="Topics" />
              <PageListItems items={page.communities} title="Communities" />
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
