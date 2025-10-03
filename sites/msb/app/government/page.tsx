import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PublicNotices } from '@/components/static/landing';
import { HomePageHighlightCard } from '@/components/static/landing/HomePageHighlightCard';
import { DarkFlatCard } from '@/components/static/LandingPage/ProminentCard';
import { Link } from '@/components/static/Link';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getClientHandler } from '@/utils/apollo/utils';
import { Hero } from '@matsugov/ui';
import { Text } from '@matsugov/ui/Text';
import { gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import { notFound } from 'next/navigation';

const metaQuery = gql(`
  query GetGovernmentPageMeta {
    landingPage(where: { title: "Government" }) {
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
      title: `MSB - ${data?.landingPage?.title || 'Government'}`,
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

const query = gql(`
  query GovernmentPage {
    landingPage(where:  {
       title: "Government"
    }) {
      heroImage
      title
      description
      body
      highlights(orderBy:  {
         priority: asc
      }, take:2) {
        id
        createdAt
        priority
        ...HomePageHighlightCard
      }
    }

    orgUnits(where: {
      AND: [
        {type:  {
          equals: "office"
        }},
        {showPage:  {
          equals: "yes"
        }}
      ]
    }) {
      id
      title
      description
      slug
      type
      icon
    },

    topic(where: {
      slug: "mayor"
    }) {
      title
      description
    }

    board(where: {
      slug: "assembly"
    }) {
      title
      description
    }

    publicNotices(take: 5, orderBy: { urgency: desc }) {
      ...PublicNoticeList
    }
  }
`);

export default async function GovernmentPage() {
  const { data } = await getClientHandler({
    query,
  });

  const page = data.landingPage;
  const publicNotices = data.publicNotices;
  const offices = data.orgUnits;
  if (!page) return notFound();

  const highlights = page.highlights;

  const elected = [
    {
      title: data.topic?.title,
      description: data.topic?.description,
      href: '/mayor',
      icon: 'icon-[mdi--account-tie-woman]',
    },
    {
      title: data.board?.title,
      description: data.board?.description,
      href: '/assembly',
      icon: 'icon-[mdi--account-group]',
    },
  ];

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <div className="flex flex-col gap-8">
        <section>
          <PageContainer size="lg" breakPoint="sm">
            <ProseWrapper>
              <h1 className="mt-0">{page.title}</h1>
              {page.body ? (
                <MarkdownRenderer>{page.body}</MarkdownRenderer>
              ) : (
                <p>{page.description}</p>
              )}
            </ProseWrapper>
          </PageContainer>
        </section>
        <div>
          <div className="bg-surface-primary text-white pb-8">
            <PageContainer size="lg" breakPoint="sm" hideBreadcrumbs>
              <section>
                <Text type="heading2">Elected</Text>
                <div className="flex gap-4 flex-wrap items-stretch justify-center">
                  {elected.map((e) => (
                    <DarkFlatCard
                      key={e.title}
                      title={e.title!}
                      icon={e.icon}
                      href={e.href}
                      description={e.description || null}
                      className="h-full w-full"
                      maxWith="md"
                    />
                  ))}
                </div>
              </section>
              <section>
                <Text type="heading2">Officers</Text>
                {offices?.length && (
                  <div className="flex gap-4 flex-wrap items-stretch justify-center lg:justify-between">
                    {offices?.map((o) => (
                      <DarkFlatCard
                        key={o.id}
                        title={o.title!}
                        icon={o.icon}
                        href={`/departments/${o.slug}`}
                        description={o.description || null}
                        className="h-full w-full"
                      />
                    ))}
                  </div>
                )}
              </section>
            </PageContainer>
          </div>
          <div className="bg-base-lightest">
            <PageContainer size="lg" breakPoint="sm" hideBreadcrumbs>
              <section>
                <Text type="heading2">Boards & Commissions</Text>
                <div className="flex gap-8 justify-center sm:justify-between items-stretch flex-wrap">
                  <DarkFlatCard
                    title="Boards"
                    icon="icon-[mdi--account-group]"
                    href="/boards#boards-and-commissions"
                    className="w-[96px] text-center h-full"
                    light
                    vertical
                  />
                  <DarkFlatCard
                    title="Community Councils"
                    icon="icon-[mdi--home-group]"
                    href="/boards?type=community_council#boards-and-commissions"
                    className="w-[96px] text-center h-full"
                    light
                    vertical
                  />
                  <DarkFlatCard
                    title="FSA Boards"
                    icon="icon-[mdi--fire-truck]"
                    href="/boards?type=fsa_board#boards-and-commissions"
                    className="w-[96px] text-center h-full"
                    light
                    vertical
                  />
                  <DarkFlatCard
                    title="RSA Boards"
                    icon="icon-[mdi--road-variant]"
                    href="/boards?type=rsa_board#boards-and-commissions"
                    light
                    className="w-[96px] text-center h-full"
                    vertical
                  />
                  <DarkFlatCard
                    title="SSA Boards"
                    icon="icon-[mdi--water-pump]"
                    href="/boards?type=ssa_board#boards-and-commissions"
                    className="w-[96px] text-center h-full"
                    light
                    vertical
                  />
                </div>
              </section>
            </PageContainer>
          </div>
        </div>
        <PageContainer
          size={highlights?.length ? 'lg' : 'sm'}
          breakPoint="sm"
          hideBreadcrumbs
        >
          <div
            className={clsx('grid', {
              'grid-cols-5 gap-8': !!highlights?.length,
            })}
          >
            <div className="col-span-5 sm:col-span-3">
              <ProseWrapper>
                <section className="border-b pb-4 pt-1 border-base-light">
                  <h2 className="mt-1">Resources</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <section>
                      <h3 className="mt-0">Services</h3>
                      <ul className="not-prose">
                        <li>
                          <Link href="/elections">Elections</Link>
                        </li>
                        <li>
                          <Link href="/taxes">Taxes</Link>
                        </li>
                        <li>
                          <Link href="/public-notices">Public Notices</Link>
                        </li>
                        <li>
                          <Link href="/boards/public-meetings">
                            Public Meetings
                          </Link>
                        </li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="mt-0">Regulations</h3>
                      <ul className="not-prose">
                        <li>
                          <Link href="/code">Borough Code</Link>
                        </li>
                        <li>
                          <Link href="/legislation">Legislation</Link>
                        </li>
                        <li>
                          <Link href="/plans">Land Use Plans</Link>
                        </li>
                      </ul>
                    </section>
                    <section>
                      <h3 className="mt-0">Transparency</h3>
                      <ul className="not-prose">
                        <li>
                          <Link href="/budget">Borough Budget</Link>
                        </li>
                        <li>
                          <Link href="/checkbook">Open Checkbook</Link>
                        </li>
                        <li>
                          <Link href="/grants">Grants</Link>
                        </li>
                        <li>
                          <Link href="/public-records">Public Records</Link>
                        </li>
                        <li>
                          <Link href="/lobbying">Lobbying</Link>
                        </li>
                      </ul>
                    </section>
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

          {!!publicNotices?.length && (
            <ProseWrapper>
              <section>
                <h2>Announcement & Public Notices</h2>
                <div className="not-prose">
                  <PublicNotices items={publicNotices} />
                </div>
              </section>
            </ProseWrapper>
          )}
        </PageContainer>
      </div>
    </>
  );
}
