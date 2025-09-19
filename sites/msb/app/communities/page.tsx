import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import notFound from '../not-found';
import { Hero } from '@matsugov/ui';
import { PageContainer, PageSection } from '@/components/static/Page';
import clsx from 'clsx';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { LinkButton } from '@/components/static/LinkButton';
import { Link } from '@/components/static/Link';
import { HomePageHighlightCard } from '@/components/static/landing/HomePageHighlightCard';
import { EventInfo } from '@/components/static/Page/EventInfo';

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
      }, take:3) {
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

    events(take: 4, orderBy: {
      startDate: desc
    }, where: {
      communities:  {
         some:  {
            status:  {
               equals: "published"
            }
         }
      }
    }) {
      id
      ...EventInfo
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
  const events = data.events;
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
                      <li key={city.id} className="w-full">
                        <LinkButton
                          href={`/communities/${city.slug}`}
                          color="primary"
                          size="lg"
                          block
                        >
                          {city.title}
                        </LinkButton>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg">Communities</h3>
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
              <section className="border-b pb-4 pt-1 border-base-light grid grid-cols-2">
                <div>
                  <h3>All Borough Services</h3>
                  <ul className="not-prose">
                    <li>
                      <Link href="/animal-care">Animal Care</Link>
                    </li>
                    <li>
                      <Link href="/central-landfill">Central Landfill</Link>
                    </li>
                    <li>
                      <Link href="/transfer-sites">Refuse Transfer Sites</Link>
                    </li>
                    <li>
                      <Link href="/road-maintenance">Road Maintenance</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Recreation & Lifestyle</h3>
                  <ul className="not-prose">
                    <li>
                      <Link href="/ice-rinks">Ice Rinks</Link>
                    </li>
                    <li>
                      <Link href="/libraries">Libraries</Link>
                    </li>
                    <li>
                      <Link href="/parks">Parks</Link>
                    </li>
                    <li>
                      <Link href="/pools">Pools</Link>
                    </li>
                    <li>
                      <Link href="/trails">Trails</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Health & Safety</h3>
                  <ul className="not-prose">
                    <li>
                      <Link href="/disaster-preparedness">
                        Disaster Preparedness
                      </Link>
                    </li>
                    <li>
                      <Link href="/ems">EMS</Link>
                    </li>
                    <li>
                      <Link href="/fire">Fire</Link>
                    </li>
                    <li>
                      <Link href="/firewise">Firewise</Link>
                    </li>
                    <li>
                      <Link href="/ppc-ratings">PPC Ratings</Link>
                    </li>
                  </ul>
                </div>
              </section>
            </ProseWrapper>
          </div>
          {!!highlights?.length && (
            <div className="col-span-5 sm:col-span-2">
              <ul className="not-prose flex flex-col gap-4">
                {highlights.map((item) => (
                  <HomePageHighlightCard data={item} key={item.id} />
                ))}
              </ul>
            </div>
          )}
        </div>
        {!!events?.length && (
          <PageSection title="Upcoming Events">
            <ul>
              {events.map((event) => (
                <EventInfo key={event.id} data={event} />
              ))}
            </ul>
          </PageSection>
        )}
      </PageContainer>
    </>
  );
}
