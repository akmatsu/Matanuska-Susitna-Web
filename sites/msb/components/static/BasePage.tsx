import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from './Page/PageHeroImage';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PagePublicNotices,
} from './Page';
import { PageTwoColumn } from './Page/PageTwoColumn';
import React, { ComponentProps } from 'react';
import { PageTopics } from './Page/PageTopics';

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

  return (
    <>
      {!props.hideHero && <PageHeroImage page={page} />}
      <PageContainer {...props.pageContainerProps} size={props.containerSize}>
        <div className="flex flex-col gap-8">
          <PageBody
            page={page}
            actionSlot={
              <div className="not-prose flex flex-col gap-2">
                <PageActions
                  actions={actions}
                  primaryAction={primaryAction}
                  secondaryActions={secondaryActions}
                />
                <PageDocuments documents={page.documents} />
              </div>
            }
          />
          {props.children}

          <PageEvents data={page} />
          <PagePublicNotices data={page} />

          <PageContacts
            contacts={page.contacts}
            primaryContact={primaryContact}
          />
          <PageTopics topics={page.topics} />
        </div>
      </PageContainer>
    </>
  );
}
