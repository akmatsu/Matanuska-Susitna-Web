import { BasePageWithActions } from '@/components/static/BasePageWithActions';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import {
  PageDistricts,
  PageListItems,
  PageSection,
} from '@/components/static/Page';
import { BoardMeetings } from '@/components/static/Page/BoardMeetings';
import { ExternalActionButton } from '@/components/static/Page/ExternalActionButtont';

import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getBoardPage = gql(`
  query GetBoard($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      ...BasePageWithActionsInfo
      ...BoardMeetings
      directory {
        ...DocumentLink
      }
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

  function BoardPageActions() {
    if (page)
      return (
        <div className="flex flex-wrap gap-2 not-prose">
          <ExternalActionButton action={page.linkToAgendas} />
          <ExternalActionButton action={page.linkToPublicOpinionMessage} />
          <ExternalActionButton action={page.linkToResolutions} />
          <LinkButton href="/boards/public-meetings-calendar">
            Public Meetings Calendar
          </LinkButton>
        </div>
      );
  }

  return (
    <BasePageWithActions
      data={page}
      rightSide={
        <>
          {page.directory && (
            <PageSection title="Directory">
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
          <PageDistricts items={page.districts} />
          <PageListItems items={page.communities} title="Communities" />
        </>
      }
      pageBodyProps={{
        actionSlot: <BoardPageActions />,
      }}
    >
      <BoardMeetings />
    </BasePageWithActions>
  );
}
