import { PageSideNavController } from '@/components/client/Page/PageSideNavController';
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { LinkButton } from '@/components/static/LinkButton';
import {
  PageActions,
  PageContacts,
  PageDistricts,
  PageDocuments,
  PageEvents,
  PageListItems,
  PageSection,
} from '@/components/static/Page';
import { PageContainer } from '@/components/static/Page/PageContainer';
import { getClient } from '@/utils/apollo/ApolloClient';
import { getPageMeta } from '@/utils/pageHelpers';
import { Hero } from '@matsugov/ui';
import { GET_BOARD, GET_BOARD_META } from '@msb/js-sdk/getBoard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  return getPageMeta('board', GET_BOARD_META, slug);
};

export default async function BoardPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const listName = 'board';

  const { data, error } = await getClient().query({
    query: GET_BOARD,
    variables: {
      where: { slug },
    },
  });

  if (error) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    throw error;
  }

  const page = data?.board;

  if (!page) {
    console.error('Board not found for slug:', slug);
    return notFound();
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer>
        <PageSideNavController
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
              <PageSection title="Meeting Schedule">
                <p>{page.meetingSchedule}</p>
              </PageSection>
              <PageDistricts items={page.districts} />
              <PageListItems items={page.communities} title="Communities" />
            </>
          }
        >
          <div className="prose max-w-none prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary">
            <p className="text-bold capitalize text-base-dark! font-bold text-2xl not-prose">
              {page.__typename?.split(/(?=[A-Z])/).join(' ')}
            </p>
            <h1>{page.title}</h1>
            <div className="flex flex-wrap gap-2 not-prose">
              {page.linkToAgendas && page.linkToAgendas.url?.url && (
                <LinkButton href={page.linkToAgendas.url.url} color="secondary">
                  {page.linkToAgendas.label}
                </LinkButton>
              )}
              {page.linkToPublicOpinionMessage?.url?.url && (
                <LinkButton
                  href={page.linkToPublicOpinionMessage.url?.url}
                  color="secondary"
                >
                  {page.linkToPublicOpinionMessage.label}
                </LinkButton>
              )}
              {page.linkToResolutions && page.linkToResolutions.url?.url && (
                <LinkButton
                  href={page.linkToResolutions.url.url}
                  color="secondary"
                >
                  {page.linkToResolutions.label}
                </LinkButton>
              )}
              <LinkButton
                href="https://matsugov.us/publicmeetings"
                color="secondary"
              >
                Public Meetings Calendar
              </LinkButton>
            </div>
            {page.body ? (
              <MarkdownRenderer>{page.body}</MarkdownRenderer>
            ) : page.description ? (
              <p>{page.description}</p>
            ) : undefined}
          </div>

          <PageEvents listName={listName} />
        </PageSideNavController>
      </PageContainer>
    </>
  );
}
