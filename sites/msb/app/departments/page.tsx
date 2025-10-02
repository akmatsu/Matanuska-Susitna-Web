import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { gql } from '@msb/js-sdk/gql';
import { Text } from '@matsugov/ui/Text';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';
import { LinkIconCard } from '@/components/static/LinkIconCard';
import { DarkFlatCard } from '@/components/static/LandingPage/ProminentCard';

const metaQuery = gql(`
  query GetDepartmentsPageMeta {
    landingPage(where: { title: "Departments" }) {
      title
      description
    }
  }
`);

export async function generateMetadata() {
  try {
    const { data } = await getClientHandler({
      query: metaQuery,
    });
    return {
      title: `MSB - ${data?.landingPage?.title || 'Departments'}`,
      description: data?.landingPage?.description,
    };
  } catch (error: any) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    if (error.networkError?.result?.errors) {
      console.error(
        'Network error: ',
        JSON.stringify(error.networkError.result.errors, null, 2),
      );
    }

    throw error;
  }
}

const pageSize = 'lg';

const query = gql(`
  query GetDepartmentsPage {
    landingPage(where: {title: "Departments"}) {
      heroImage
      title
      description
      body
    }

    orgUnits(where: {
      AND: [
        {
          OR: [
            { type: { equals: "department" } },
            { type: { equals: "office" } }
          ]
        },
        {
          showPage: { equals: "yes" }
        }
      ]
    }, orderBy:  {
       title: asc
    }) {
      id
      title
      description
      slug
      type
      icon
    }
  }
`);

export default async function DepartmentsPage() {
  const { data } = await getClientHandler({
    query,
  });
  const page = data.landingPage;

  const offices = data.orgUnits?.filter((d) => d.type === 'office') || [];
  const departments =
    data.orgUnits?.filter((d) => d.type === 'department') || [];

  if (!page) return notFound();

  return (
    <div className="flex flex-col gap-8">
      <PageContainer size={pageSize} breakPoint={pageSize}>
        <ProseWrapper>
          <h1>{page.title}</h1>
          <MarkdownRenderer>{page.body}</MarkdownRenderer>
        </ProseWrapper>
      </PageContainer>
      <section className="bg-surface-primary text-white pb-8">
        <PageContainer size={pageSize} breakPoint="sm" hideBreadcrumbs>
          <Text type="heading2">Officers</Text>
          <div className="flex gap-4 flex-wrap items-stretch justify-center">
            {offices.map((o) => (
              <DarkFlatCard
                key={o.id}
                title={o.title!}
                icon={o.icon}
                description={o.description}
                href={`/departments/${o.slug}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>
      <section>
        <PageContainer size={pageSize} breakPoint="sm" hideBreadcrumbs>
          <Text type="heading2">Departments</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((d) => (
              <LinkIconCard
                key={d.id}
                href={`/departments/${d.slug}`}
                icon={d.icon}
                title={d.title}
                description={d.description}
              />
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
