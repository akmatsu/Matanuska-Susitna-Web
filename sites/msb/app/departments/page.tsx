import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import Link from 'next/link';

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
      OR: [
        {type: {
          equals: "department"
        }}
        {
          type: {
            equals: "office"
          }
        }
      ]
    }) {
      id
      title
      duties
      slug
      type
      icon
    }
  }
`);

export default async function DepartmentsPage() {
  const { data } = await getClient().query({ query });
  const page = data.landingPage;

  const offices = data.orgUnits?.filter((d) => d.type === 'office') || [];
  const departments =
    data.orgUnits?.filter((d) => d.type === 'department') || [];

  if (!page) return null;

  return (
    <div>
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
                  <p className="text-white">{o.duties}</p>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
      <section>
        <PageContainer size={pageSize} breakPoint="sm" hideBreadcrumbs>
          <h2 className="text-2xl font-bold mb-4">Departments</h2>
          <div className="grid grid-cols-2 gap-4">
            {departments.map((d) => (
              <Link
                href={`/departments/${d.slug}`}
                key={d.id}
                className="flex gap-3 col-span-1 w-full text-black no-underline group rounded transition-colors overflow-hidden border border-base-lighter hover:border-base-light "
              >
                <div className="h-full bg-base-lightest p-4">
                  <div className="aspect-square size-20 p-4 rounded-full bg-primary group-hover:bg-primary-dark justify-center items-center flex transition-colors">
                    <span className={clsx('size-full text-white', d.icon)} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-primary-dark transitions-colors">
                    {d.title}
                  </h3>
                  <p>{d.duties}</p>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
