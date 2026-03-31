import { BasePage } from '@/components/static/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from '@/components/static/Page';
import { BoardMeetings } from '@/components/static/Page/BoardMeetings';
import { ExternalActionButton } from '@/components/static/Page/ExternalActionButtont';
import { BoardDirectoryDisplay } from '@/components/static/Page/BoardDirectoryDisplay';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';

import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';
import { ComponentProps } from 'react';

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
      directoryExcel 
    }
  }
`);

type ActionButtonAction = ComponentProps<typeof ExternalActionButton>['action'];

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

  return (
    <BasePage
      data={page}
      mapSlot={
        <>
          {page.directoryExcel ? (
            <LinkButton
              href={`/boards/${slug}/directory`}
              block
              color="primary"
            >
              View Directory
            </LinkButton>
          ) : (
            page.directory && (
              <PageSection title="Directory">
                <DocumentLinkButton data={page.directory} block color="primary">
                  View Directory
                </DocumentLinkButton>
              </PageSection>
            )
          )}
        </>
      }
      pageBodyProps={{
        actionSlot: page && (
          <BoardPageActions
            linkToAgendas={page.linkToAgendas}
            linkToResolutions={page.linkToResolutions}
            linkToPublicOpinionMessage={page.linkToPublicOpinionMessage}
            pageTitle={page.title}
          />
        ),
      }}
    >
      <BoardMeetings />
    </BasePage>
  );
}

function BoardPageActions(props: {
  linkToAgendas: ActionButtonAction;
  linkToResolutions: ActionButtonAction;
  linkToPublicOpinionMessage: ActionButtonAction;
  pageTitle?: string | null;
}) {
  return (
    <div className="not-prose flex flex-wrap gap-2 sm:mb-2">
      <ExternalActionButton
        action={props.linkToAgendas}
        blockOnMobile
        color="primary"
      />
      <ExternalActionButton
        action={props.linkToPublicOpinionMessage}
        blockOnMobile
        color="primary"
      />
      <ExternalActionButton
        action={props.linkToResolutions}
        blockOnMobile
        color="primary"
      />
      <LinkButton
        href={
          props.pageTitle === 'School Board'
            ? 'https://www.matsuk12.us/about-us/calendars'
            : '/boards/public-meetings-calendar'
        }
        blockOnMobile
        color="primary"
      >
        {props.pageTitle === 'School Board'
          ? 'School District Calendar'
          : 'Public Meetings Calendar'}
      </LinkButton>
    </div>
  );
}
