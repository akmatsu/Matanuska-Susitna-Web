import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from '../Page/PageHeroImage';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageListItems,
  PagePublicNotices,
} from '../Page';
import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import { PageViewTracker } from '../../client/PageViewTracker';
import { PageTopics } from '../Page/PageTopics';
import { InPageNavigation } from '@matsugov/ui/InPageNavigation';
import { HideOnDesktop } from './HideOnDesktop';

const BasePageFragment = gql(`
  fragment BasePageInfo on BasePageWithSlug {
    id
    __typename
    ...PageBody
    ...HeroImage
    contacts {
      ...ContactList
    }
    documents {
      ...DocumentList
    }
    ...PageEvents
    ...PagePublicNotices
    topics(orderBy:  {
       title: asc
    }) {
      ...TopicList
    }
    communities(orderBy:  {
       title: asc
    }) {
      ...PageList
    }
    orgUnits(orderBy:  {
       title: asc
    }) {
      ...PageList
    }

    assemblyDistricts(orderBy:  {
       title: asc
    }) {
      ...PageList
    }
    services(orderBy:  {
       title: asc
    }) {
      ...PageList
    }
    plans(orderBy:  {
       title: asc
    }) {
      ...PageList
    }
    ... on BasePageWithActions {
      actions(orderBy:  {
         label: asc
      }) {
        ...ActionList
      }
    }
    ... on Service {
      primaryContact {
        ...ContactList
      }
      primaryAction {
        ...ExternalActionFields
      }
      secondaryActions {
        ...ExternalActionFields
      }
    }
    ... on Plan {
      effort {
        ...ExternalActionFields
      }
    }
  }
`);

export function BasePage(props: {
  data?: FragmentType<typeof BasePageFragment> | null;
  children?: React.ReactNode;
  rightSide?: React.ReactNode;
  hideHero?: boolean;
  mapSlot?: React.ReactNode;
  pageContainerProps?: Omit<ComponentProps<typeof PageContainer>, 'children'>;
  pageBodyProps?: Omit<ComponentProps<typeof PageBody>, 'page'>;
}) {
  const page = getFragmentData(BasePageFragment, props.data);

  if (!page) return null;

  const primaryContact = 'primaryContact' in page ? page.primaryContact : null;
  const primaryAction =
    'primaryAction' in page
      ? page.primaryAction
      : 'effort' in page
        ? page.effort
        : null;
  const secondaryActions =
    'secondaryActions' in page ? page.secondaryActions : null;
  const actions = 'actions' in page ? page.actions : null;

  const hasSideColumnContent = !!(
    props.rightSide ||
    props.mapSlot ||
    primaryContact ||
    primaryAction ||
    actions?.length ||
    secondaryActions?.length ||
    page.documents?.length ||
    page.contacts?.length ||
    page.assemblyDistricts?.length ||
    page.communities?.length ||
    page.orgUnits?.length
  );

  return (
    <>
      {!props.hideHero && <PageHeroImage page={page} />}
      <div className="flex justify-center relative">
        <div className="absolute left-0 top-0 h-full hidden min-[1415px]:block">
          <div className="sticky top-0 left-0 pl-4 pt-4">
            <InPageNavigation />
          </div>
        </div>
        <PageContainer
          {...props.pageContainerProps}
          size={hasSideColumnContent ? 'lg' : 'sm'}
          breakPoint="lg"
        >
          <div
            className={clsx({
              'lg:grid grid-cols-3 gap-8': hasSideColumnContent,
            })}
          >
            {/* Main content */}
            <div className="flex flex-col gap-8 col-span-2" id="main-content">
              <PageBody
                page={page}
                {...props.pageBodyProps}
                actionSlot={
                  <>
                    {props.pageBodyProps?.actionSlot}
                    <HideOnDesktop className="not-prose flex flex-col gap-2">
                      {props.mapSlot}
                      <PageActions
                        actions={actions}
                        primaryAction={primaryAction}
                        secondaryActions={secondaryActions}
                      />
                      <PageDocuments documents={page.documents} />
                    </HideOnDesktop>
                  </>
                }
              />
              <PageListItems title="Services" items={page.services} />
              {props.children}

              {props.rightSide}

              <PageListItems
                title="Assembly Districts"
                items={page.assemblyDistricts}
              />
              <PageListItems title="Communities" items={page.communities} />
              <PageListItems
                title="Departments & Divisions"
                items={page.orgUnits}
              />
              <PageListItems title="Plans" items={page.plans} />

              <PageEvents data={page} />
              <PagePublicNotices data={page} />

              <HideOnDesktop>
                <PageContacts
                  contacts={page.contacts}
                  primaryContact={primaryContact}
                />
                <PageTopics topics={page.topics} />
              </HideOnDesktop>
            </div>

            {/* Right sidebar */}
            <div
              className={clsx('hidden', {
                'lg:flex flex-col gap-8 col-span-1': hasSideColumnContent,
              })}
            >
              {props.mapSlot}
              <PageActions
                actions={actions}
                primaryAction={primaryAction}
                secondaryActions={secondaryActions}
              />
              <PageDocuments documents={page.documents} />

              <PageListItems
                title="Assembly Districts"
                items={page.assemblyDistricts}
              />
              {props.rightSide}
              <PageListItems title="Communities" items={page.communities} />

              <PageContacts
                contacts={page.contacts}
                primaryContact={primaryContact}
              />
              <PageTopics topics={page.topics} />
            </div>
          </div>
        </PageContainer>
        <PageViewTracker pageId={page.id} pageType={page.__typename} />
      </div>
    </>
  );
}
