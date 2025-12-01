import { BasePage } from '@/components/static/BasePage/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from '@/components/static/Page';
import { BoardMeetings } from '@/components/static/Page/BoardMeetings';
import { ExternalActionButton } from '@/components/static/Page/ExternalActionButtont';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';

import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetBoardMeta($slug: String!) {
    board(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('board', metaQuery, slug);
};

const getBoardPage = gql(`
  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {
    board(where: $where) {
      title
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

  const { data, error } = await getClientHandler({
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
        <div className="flex flex-wrap gap-2 not-prose sm:mb-2">
          <ExternalActionButton
            action={page.linkToAgendas}
            blockOnMobile
            color="primary"
          />
          <ExternalActionButton
            action={page.linkToPublicOpinionMessage}
            blockOnMobile
            color="primary"
          />
          <ExternalActionButton
            action={page.linkToResolutions}
            blockOnMobile
            color="primary"
          />
          <LinkButton
            href={
              page.title === 'School Board'
                ? 'https://www.matsuk12.us/about-us/calendars'
                : '/boards/public-meetings-calendar'
            }
            blockOnMobile
            color="primary"
          >
            {page.title === 'School Board'
              ? 'School District Calendar'
              : 'Public Meetings Calendar'}
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
            <PageSection title="Directory">
              <DocumentLinkButton
                data={page.directory}
                block
                size="lg"
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
