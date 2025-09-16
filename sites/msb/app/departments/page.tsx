import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';
import { LinkIconCard } from '@/components/static/LinkIconCard';

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
          <h2 className="text-2xl font-bold mb-4">Officers</h2>
          <div className="flex gap-4 flex-wrap items-stretch justify-center">
            {offices.map((o) => (
              <Link
                href={`/departments/${o.slug}`}
                key={o.id}
                className="flex gap-3 max-w-xs text-white no-underline group hover:bg-white/3 p-2 rounded transition-colors"
              >
                <div>
                  <div className="aspect-square size-20 p-4 rounded-full bg-primary justify-center items-center flex">
                    <span className={clsx('size-full', o.icon)} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary">
                    {o.title}
                  </h3>
                  <p className="text-white">{o.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
      <section>
        <PageContainer size={pageSize} breakPoint="sm" hideBreadcrumbs>
          <h2 className="text-2xl font-bold mb-4">Departments</h2>
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
