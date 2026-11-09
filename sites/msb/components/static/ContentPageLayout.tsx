import React, { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import { PageViewTracker } from '../client/PageViewTracker';
import { PageColumnController } from '../client/PageColumnController';
import { PageHeroImageView } from './Page/PageHeroImage';
import { PageActionsView, type ExternalActionData } from './Page/PageActions';
import { PageBodyView, type PageBodyViewProps } from './Page/PageBody';
import { PageContactsView, type ContactListData } from './Page/PageContacts';
import { PageDocumentsView, type DocumentListData } from './Page/PageDocuments';
import { PageEventsView, type PageEventData } from './Page/PageEvents';
import { PageListItemsView, type PageListData } from './Page/PageListItems';
import {
  PagePublicNoticesView,
  type PagePublicNoticeData,
} from './Page/PagePublicNotices';
import { PageTopicsView, type TopicListData } from './Page/PageTopics';

/**
 * Everything the standard content page layout shows. The field shapes follow
 * the CMS REST API, so REST pages can pass their data with little mapping.
 * Keystone GraphQL pages map their fragments to this shape in `BasePage`.
 */
export type ContentPageData = {
  id: string;
  /** Sent to page-view tracking, e.g. "Service". */
  pageType: string;
  /** Shown above the title, e.g. "Service". */
  typeLabel?: string;
  title?: string | null;
  description?: string | null;
  heroImage?: string | null;
  hideSideNav?: boolean | null;
  primaryAction?: ExternalActionData | null;
  secondaryActions?: ExternalActionData[] | null;
  documents?: DocumentListData[] | null;
  primaryContact?: ContactListData | null;
  contacts?: ContactListData[] | null;
  events?: PageEventData[] | null;
  publicNotices?: PagePublicNoticeData[] | null;
  topics?: TopicListData[] | null;
  services?: PageListData[] | null;
  communities?: PageListData[] | null;
  orgUnits?: PageListData[] | null;
  assemblyDistricts?: PageListData[] | null;
  plans?: PageListData[] | null;
};

export type ContentPageLayoutProps = {
  page: ContentPageData;
  /** The rendered rich text. Leave empty to show the description instead. */
  body?: ReactNode;
  /**
   * Keystone internal-link actions, already rendered. Only GraphQL pages
   * have these today.
   */
  internalActions?: ReactNode;
  hasInternalActions?: boolean;
  children?: ReactNode;
  rightSide?: ReactNode;
  hideHero?: boolean;
  mapSlot?: ReactNode;
  pageContainerProps?: Omit<
    ComponentProps<typeof PageColumnController>,
    'children'
  >;
  pageBodyProps?: Pick<
    PageBodyViewProps,
    'noProse' | 'hideType' | 'actionSlot'
  >;
};

export function ContentPageLayout(props: ContentPageLayoutProps) {
  const { page } = props;

  const hasSideColumnContent = !!(
    props.rightSide ||
    props.mapSlot ||
    page.primaryContact ||
    page.primaryAction ||
    props.hasInternalActions ||
    page.secondaryActions?.length ||
    page.documents?.length ||
    page.contacts?.length ||
    page.services?.length ||
    page.communities?.length ||
    page.orgUnits?.length
  );

  const actions = (
    <PageActionsView
      primaryAction={page.primaryAction}
      secondaryActions={page.secondaryActions}
      actionsSlot={props.internalActions}
    />
  );

  return (
    <>
      {!props.hideHero && <PageHeroImageView image={page.heroImage} />}
      <PageColumnController
        {...props.pageContainerProps}
        showSideNav={!page.hideSideNav}
        right={
          hasSideColumnContent && (
            <>
              {props.mapSlot}
              {actions}
              <PageDocumentsView documents={page.documents} />

              <PageListItemsView
                title="Assembly Districts"
                items={page.assemblyDistricts}
              />
              {props.rightSide}
              <PageListItemsView title="Plans" items={page.plans} />
              <PageListItemsView
                title="Departments & Divisions"
                items={page.orgUnits}
              />

              <PageContactsView
                contacts={page.contacts}
                primaryContact={page.primaryContact}
              />
              <PageTopicsView topics={page.topics} />
            </>
          )
        }
      >
        <PageBodyView
          {...props.pageBodyProps}
          typeLabel={page.typeLabel}
          title={page.title}
          description={page.description}
          actionSlot={
            <div className="flex flex-col gap-2">
              {props.pageBodyProps?.actionSlot}
              <HideOnDesktop className="not-prose flex flex-col gap-2">
                {props.mapSlot}
                {actions}
                <PageDocumentsView documents={page.documents} />
              </HideOnDesktop>
            </div>
          }
        >
          {props.body}
        </PageBodyView>
        <PageListItemsView title="Services" items={page.services} />
        {props.children}

        <HideOnDesktop className="flex flex-col gap-8">
          {props.rightSide}

          <PageListItemsView
            title="Assembly Districts"
            items={page.assemblyDistricts}
          />

          <PageListItemsView
            title="Departments & Divisions"
            items={page.orgUnits}
          />
        </HideOnDesktop>

        <PageListItemsView title="Communities" items={page.communities} />
        <PageEventsView events={page.events} />
        <PagePublicNoticesView items={page.publicNotices} />

        <HideOnDesktop>
          <PageContactsView
            contacts={page.contacts}
            primaryContact={page.primaryContact}
          />
          <PageTopicsView topics={page.topics} />
        </HideOnDesktop>
      </PageColumnController>

      {process.env.NODE_ENV === 'production' && (
        <PageViewTracker pageId={page.id} pageType={page.pageType} />
      )}
    </>
  );
}

function HideOnDesktop(props: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('lg:hidden', props.className)}>{props.children}</div>
  );
}
