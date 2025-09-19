import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import notFound from '../not-found';
import { Hero } from '@matsugov/ui';
import { PageContainer } from '@/components/static/Page';
import clsx from 'clsx';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { LinkButton } from '@/components/static/LinkButton';
import { Link } from '@/components/static/Link';

const query = gql(`
  query CommunitiesPage {
    landingPage(where: {
      title: "Communities"
    }) {
      heroImage
      title
      description
      body
      highlights(orderBy: {
        priority: asc
      }, take:2) {
        id
        createdAt
        priority
        ...HomePageHighlightCard
      }
    }

    cities: communities(where: {
      type:  {
         equals: "city"
      }
    }) {
      id
      title
      slug
    }

    towns: communities(where: {
      type:  {
         not:  {
            equals: "city"
         }
      }
    }) {
      id
      title
      slug
    }
  }
`);

export default async function Communities() {
  const { data } = await getClientHandler({
    query,
  });

  const page = data.landingPage;
  const cities = data.cities;
  const towns = data.towns;
  if (!page) return notFound();

  const highlights = page.highlights;

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer size={highlights?.length ? 'lg' : 'sm'} breakPoint="sm">
        <div
          className={clsx('grid', {
            'grid-cols-5 gap-8': !!highlights?.length,
          })}
        >
          <div className="col-span-5 sm:col-span-3">
            <ProseWrapper>
              <section>
                <h1 className="mt-0">{page.title}</h1>
                {page.body ? (
                  <MarkdownRenderer>{page.body}</MarkdownRenderer>
                ) : (
                  <p>{page.description}</p>
                )}
              </section>
              <section className="border-y pb-4 pt-1 border-base-light">
                <h2 className="mt-0">Borough Communities</h2>
                <section>
                  <h3 className="mt-0 text-lg">Cities</h3>
                  <ul className="not-prose flex flex-col sm:flex-row gap-4 items-stretch justify-center">
                    {cities?.map((city) => (
                      <li key={city.id}>
                        <LinkButton href={`/communities/${city.slug}`}>
                          {city.title}
                        </LinkButton>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg">Officers & Boards</h3>
                  <ul className="not-prose grid grid-cols-2 gap-2">
                    {towns?.map((town) => (
                      <li key={town.id}>
                        <Link href={`/communities/${town.slug}`}>
                          {town.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
            </ProseWrapper>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
