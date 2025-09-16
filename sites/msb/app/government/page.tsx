import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PublicNotices } from '@/components/static/landing';
import { HomePageHighlightCard } from '@/components/static/landing/HomePageHighlightCard';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getClientHandler } from '@/utils/apollo/utils';
import { Hero } from '@matsugov/ui';
import { gql } from '@msb/js-sdk/gql';
import clsx from 'clsx';
import { notFound } from 'next/navigation';

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
  if (!page) return notFound();

  const highlights = page.highlights;

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer size={!!highlights?.length ? 'lg' : 'sm'} breakPoint="sm">
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
                <h2 className="mt-0">Leaders</h2>
                <section>
                  <h3 className="mt-0 text-lg">Elected</h3>
                  <ul className="not-prose flex flex-col sm:flex-row gap-4 items-stretch justify-center">
                    <li className="w-full">
                      <LinkButton href="/mayor" block color="primary">
                        Mayor
                      </LinkButton>
                    </li>
                    <li className="w-full">
                      <LinkButton href="/assembly" block color="primary">
                        Assembly
                      </LinkButton>
                    </li>
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg">Officers & Boards</h3>
                  <ul className="not-prose grid grid-cols-2 gap-2">
                    <li>
                      <Link href="/departments/borough-manager">
                        Borough Manager
                      </Link>
                    </li>
                    <li>
                      <Link href="/departments/borough-clerk">
                        Borough Clerk
                      </Link>
                    </li>
                    <li>
                      <Link href="/departments/borough-attorney">
                        Borough Attorney
                      </Link>
                    </li>
                    <li>
                      <Link href="/boards">Boards</Link>
                    </li>
                  </ul>
                </section>
              </section>
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
                    <h3 className="mt-0">Law</h3>
                    <ul className="not-prose">
                      <li>
                        <Link href="/code">Borough Code</Link>
                      </li>
                      <li>
                        <Link href="/legislation">Legislation</Link>
                      </li>
                      <li>
                        <Link href="/plans">Adopted Plans</Link>
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
          {highlights && (
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
    </>
  );
}
