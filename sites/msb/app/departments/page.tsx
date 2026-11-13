import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { gql } from '@msb/js-sdk/gql';
import { Text } from '@matsugov/ui/Text';
import { notFound } from 'next/navigation';
import { listAllOrgUnits } from '@msb/cms-sdk';
import { NEXT_DEFAULT_REVALIDATE } from '@/configs/config';
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
  }
`);

export default async function DepartmentsPage() {
  // The page text still comes from Keystone. The org units come from the
  // Laravel CMS, sorted by title.
  const [{ data }, orgUnits] = await Promise.all([
    getClientHandler({ query }),
    listAllOrgUnits({
      filter: { unitType: ['department', 'office'], showPage: true },
      revalidate: NEXT_DEFAULT_REVALIDATE,
    }),
  ]);
  const page = data?.landingPage;

  const offices = orgUnits.filter((o) => o.unitType === 'office');
  const departments = orgUnits.filter((o) => o.unitType === 'department');

  if (!page) return notFound();

  return (
    <div className="flex flex-col gap-8">
      <PageContainer size={pageSize}>
        <ProseWrapper>
          <h1>{page.title}</h1>
          <MarkdownRenderer>{page.body}</MarkdownRenderer>
        </ProseWrapper>
      </PageContainer>
      <section className="bg-surface-primary pb-8 text-white">
        <PageContainer size={pageSize}>
          <Text type="heading2">Officers</Text>
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {offices.map((o) => (
              <DarkFlatCard
                key={o.id}
                title={o.title}
                icon={o.icon}
                description={o.description}
                href={`/departments/${o.slug}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>
      <section>
        <PageContainer size={pageSize}>
          <Text type="heading2">Departments</Text>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
