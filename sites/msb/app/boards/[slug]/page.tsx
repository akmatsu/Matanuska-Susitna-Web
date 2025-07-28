import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
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
import { BoardMeetings } from '@/components/static/Page/BoardMeetings';
import { ExternalActionButton } from '@/components/static/Page/ExternalActionButtont';
import { PageContainer } from '@/components/static/Page/PageContainer';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getBoardPage = gql(`
  query GetBoard($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      body
      description
      title
      ...HeroImage
      isActive
      directory {
        ...DocumentLink
      }
      ...BoardMeetings
      communities {
        ...PageList
      }
      districts {
        ...DistrictList
      }
      linkToAgendas {
        ...ExternalActionButton
      }
      linkToResolutions {
        ...ExternalActionButton
      }
      linkToPublicOpinionMessage {
        ...ExternalActionButton
      }
      contacts {
        ...ContactList
      }
      actions {
        ...ActionList
      }
      documents {
        ...DocumentList
      }
    }
  }
`);

export default async function BoardPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, error } = await getClient().query({
    query: getBoardPage,
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
      <PageHeroImage page={page} />
      <PageContainer>
        <PageTwoColumn
          rightSide={
            <>
              {page.directory && (
                <PageSection title="Directory">
                  <DocumentLinkButton data={page.directory}>
                    View Directory
                  </DocumentLinkButton>
                </PageSection>
              )}
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
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
              <ExternalActionButton action={page.linkToAgendas} />
              <ExternalActionButton action={page.linkToPublicOpinionMessage} />
              <ExternalActionButton action={page.linkToResolutions} />
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

          <BoardMeetings data={page} />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
