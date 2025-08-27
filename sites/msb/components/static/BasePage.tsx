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
import { PageTwoColumn } from './Page/PageTwoColumn';
import React, { ComponentProps, ReactNode } from 'react';
import { PageTopics } from './Page/PageTopics';
import clsx from 'clsx';

const BasePageFragment = gql(`
  fragment BasePageInfo on BasePageWithSlug {
    ...PageBody
    ...HeroImage
    id
    contacts {
      ...ContactList
    }
    documents {
      ...DocumentList
    }
    topics {
      ...PageList
    }
    ...PageEvents
    ...PagePublicNotices
    topics {
      ...TopicList
    }
    communities {
      ...PageList
    }

    orgUnits {
      ...PageList
    }

    assemblyDistricts {
      ...PageList
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

    ... on BasePageWithActions {
      actions {
        ...ActionList
      }
    }
  }
`);

export function BasePage<
  T extends React.ElementType = typeof PageTwoColumn,
>(props: {
  data?: FragmentType<typeof BasePageFragment> | null;
  children?: React.ReactNode;
  rightSide?: React.ReactNode;
  hideHero?: boolean;
  actionsSlot?: React.ReactNode;
  mapSlot?: React.ReactNode;
  columnControllerAs?: T;
  columnControllerProps?: Omit<ComponentProps<T>, 'rightSide'>;
  pageContainerProps?: Omit<ComponentProps<typeof PageContainer>, 'children'>;
  pageBodyProps?: Omit<ComponentProps<typeof PageBody>, 'page'>;
  containerSize?: ComponentProps<typeof PageContainer>['size'];
}) {
  const page = getFragmentData(BasePageFragment, props.data);

  if (!page) return;

  const primaryContact = 'primaryContact' in page ? page.primaryContact : null;
  const primaryAction = 'primaryAction' in page ? page.primaryAction : null;
  const secondaryActions =
    'secondaryActions' in page ? page.secondaryActions : null;
  const actions = 'actions' in page ? page.actions : null;

  const hasSideColumnContent = !!(
    props.rightSide ||
    props.mapSlot ||
    primaryContact ||
    primaryAction ||
    actions?.length ||
    secondaryActions?.length
  );

  function HideOnDesktop(props: { children: ReactNode; className?: string }) {
    return (
      <div className={`lg:hidden ${props.className}`}>{props.children}</div>
    );
  }

  return (
    <>
      {!props.hideHero && <PageHeroImage page={page} />}
      <PageContainer {...props.pageContainerProps} size="lg" breakPoint="lg">
        <div
          className={clsx({
            'lg:grid grid-cols-3 gap-8': hasSideColumnContent,
          })}
        >
          {/* Main content */}
          <div className="flex flex-col gap-8 col-span-2">
            <PageBody
              page={page}
              actionSlot={
                <HideOnDesktop className="not-prose flex flex-col gap-2">
                  <PageActions
                    actions={actions}
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                  />
                  <PageDocuments documents={page.documents} />
                </HideOnDesktop>
              }
            />
            {props.children}

            <HideOnDesktop className="flex flex-col gap-8">
              {props.rightSide}
              <PageListItems
                title="Assembly Districts"
                items={page.assemblyDistricts}
              />
            </HideOnDesktop>

            <PageEvents data={page} />
            <PagePublicNotices data={page} />

            <HideOnDesktop>
              <PageContacts
                contacts={page.contacts}
                primaryContact={primaryContact}
              />
            </HideOnDesktop>
            <PageTopics topics={page.topics} />
          </div>

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
            <PageContacts
              contacts={page.contacts}
              primaryContact={primaryContact}
            />
            {props.rightSide}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
