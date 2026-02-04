import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from './Page/PageHeroImage';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageListItems,
  PagePublicNotices,
} from './Page';
import React, { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import { PageViewTracker } from '../client/PageViewTracker';
import { PageTopics } from './Page/PageTopics';

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

    ... on BasePageWithDefaultRelationships {
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
  const services = 'services' in page ? page.services : null;
  const communities = 'communities' in page ? page.communities : null;
  const orgUnits = 'orgUnits' in page ? page.orgUnits : null;
  const assemblyDistricts =
    'assemblyDistricts' in page ? page.assemblyDistricts : null;
  const topics = 'topics' in page ? page.topics : null;
  const plans = 'plans' in page ? page.plans : null;

  const hasSideColumnContent = !!(
    props.rightSide ||
    props.mapSlot ||
    primaryContact ||
    primaryAction ||
    actions?.length ||
    secondaryActions?.length ||
    page.documents?.length ||
    page.contacts?.length ||
    services?.length ||
    communities?.length ||
    orgUnits?.length
  );

  return (
    <>
      {!props.hideHero && <PageHeroImage page={page} />}
      <PageContainer
        {...props.pageContainerProps}
        size={hasSideColumnContent ? 'lg' : 'sm'}
        breakPoint="lg"
      >
        <div
          className={clsx('w-full', {
            'lg:grid lg:grid-cols-11 lg:gap-8': hasSideColumnContent,
          })}
        >
          {/* Main content */}
          <div className="flex flex-col gap-8 col-span-8">
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
            <PageListItems title="Services" items={services} />
            {props.children}

            <HideOnDesktop className="flex flex-col gap-8">
              {props.rightSide}

              <PageListItems
                title="Assembly Districts"
                items={assemblyDistricts}
              />
              <PageListItems title="Communities" items={communities} />
              <PageListItems title="Departments & Divisions" items={orgUnits} />
            </HideOnDesktop>

            <PageEvents data={page} />
            <PagePublicNotices data={page} />

            <HideOnDesktop>
              <PageContacts
                contacts={page.contacts}
                primaryContact={primaryContact}
              />
              <PageTopics topics={topics} />
            </HideOnDesktop>
          </div>

          {/* Right sidebar */}
          <div
            className={clsx('hidden nav-ignore', {
              'lg:flex flex-col gap-8 col-span-3': hasSideColumnContent,
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
              items={assemblyDistricts}
            />
            {props.rightSide}
            <PageListItems title="Communities" items={communities} />
            <PageListItems title="Plans" items={plans} />
            <PageListItems title="Departments & Divisions" items={orgUnits} />

            <PageContacts
              contacts={page.contacts}
              primaryContact={primaryContact}
            />
            <PageTopics topics={topics} />
          </div>
        </div>
      </PageContainer>
      <PageViewTracker pageId={page.id} pageType={page.__typename} />
    </>
  );
}

function HideOnDesktop(props: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('lg:hidden', props.className)}>{props.children}</div>
  );
}
