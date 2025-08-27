import { BasePage } from '@/components/static/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { PageListItems, PageSection } from '@/components/static/Page';
import { BoardMeetings } from '@/components/static/Page/BoardMeetings';
import { ExternalActionButton } from '@/components/static/Page/ExternalActionButtont';

import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getBoardPage = gql(`
  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {
    board(where: $where) {
      ...BasePageInfo
      ...BoardMeetings
      directory {
        ...DocumentLink
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
      now: new Date().toISOString(),
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

  function BoardPageActions() {
    if (page)
      return (
        <div className="flex flex-wrap gap-2 not-prose">
          <ExternalActionButton action={page.linkToAgendas} blockOnMobile />
          <ExternalActionButton
            action={page.linkToPublicOpinionMessage}
            blockOnMobile
          />
          <ExternalActionButton action={page.linkToResolutions} blockOnMobile />
          <LinkButton href="/boards/public-meetings-calendar" blockOnMobile>
            Public Meetings Calendar
          </LinkButton>
        </div>
      );
  }

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          {page.directory && (
            <PageSection noMargins title="Directory">
              <DocumentLinkButton
                data={page.directory}
                block
                big
                color="primary"
              >
                View Directory
              </DocumentLinkButton>
            </PageSection>
          )}
        </>
      }
      pageBodyProps={{
        actionSlot: <BoardPageActions />,
      }}
    >
      <BoardMeetings />
    </BasePage>
  );
}
