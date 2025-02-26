import { FeaturedContent, Meetings, SearchListItem } from '@/components';
import { ContactsList } from '@/components/ContactsList';
import { LinkCardGrid } from '@/components/LinkCardGrid';
import { getClient } from '@/utils/apollo/ApolloClient';
import { CardBody, CardHeader, CardTitle, Hero, LinkCard } from '@matsugov/ui';
import { GET_ORG_UNIT_META_QUERY, GET_ORG_UNIT_QUERY } from '@msb/js-sdk';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { data } = await getClient().query({
    query: GET_ORG_UNIT_META_QUERY,
    variables: {
      where: { slug: params.slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return {
    title: `MSB - ${data?.orgUnit.title}`,
    description: data?.orgUnit.description,
  };
}

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { data, errors } = await getClient().query({
    query: GET_ORG_UNIT_QUERY,
    variables: {
      where: { slug: params.slug },
    },

    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  const department = data?.orgUnit;

  if (errors) {
    return (
      <div>
        <h1>Department Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <Hero image={department.heroImage || undefined} />
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8 flex flex-col gap-8">
          <div className="prose">
            <h1>{department.title}</h1>
            <p>{department.description}</p>
          </div>
          <section>
            <h2 className="text-2xl font-bold mb-4">Services</h2>

            <LinkCardGrid items={department.services} listKey="services" />
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            <FeaturedContent />
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Events</h2>

            <Meetings />
          </section>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Contacts</h2>
            <ContactsList contacts={department.contacts} />
          </section>
          {department.parent && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Parent Department</h2>
              <LinkCard href={`/departments/${department.parent.slug}`}>
                <CardHeader>
                  <CardTitle>{department.parent.title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="truncate">{department.parent.description}</p>
                </CardBody>
              </LinkCard>
            </section>
          )}
          <section>
            <h2 className="text-2xl font-bold mb-4">Divisions</h2>
            <ul className="flex flex-col gap-2">
              {department.children.map((child) => (
                <LinkCard href={`/departments/${child.slug}`}>
                  <CardHeader>
                    <CardTitle>{child.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="truncate">{child.description}</p>
                  </CardBody>
                </LinkCard>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
