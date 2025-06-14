import {
  PageActions,
  PageAddress,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PagePublicNotices,
  PageSection,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Card, CardBody, CardHeader, CardTitle, Hero } from '@matsugov/ui';
import { GET_ASSEMBLY_DISTRICT_QUERY } from '@msb/js-sdk';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DistrictPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_ASSEMBLY_DISTRICT_QUERY,
    variables: { slug },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.assemblyDistrict) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.assemblyDistrict;
  const publicNotices = data.publicNotices;
  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageSection title="Assembly Member">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle>{page.memberName}</CardTitle>
                      {page.photo?.file?.url && (
                        <Image
                          src={page.photo.file.url}
                          className="rounded-full size-20"
                          alt={
                            page.memberName ||
                            `Assembly Member of ${page.title}`
                          }
                          width={80}
                          height={80}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>{page.bio}</p>
                    <Link href={`tel${page.phone}`}>{page.phone}</Link>
                    <Link href={`mailto:${page.email}`}>{page.email}</Link>
                  </CardBody>
                </Card>
              </PageSection>
              <PageAddress address={page.address} />
              <PageContacts contacts={page.contacts} />
            </>
          }
        >
          <PageBody
            title={page.title}
            description={page.description}
            body={page.body}
          />

          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="OrgUnit" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
