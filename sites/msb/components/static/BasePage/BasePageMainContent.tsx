import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageDocuments,
  PageEvents,
  PageListItems,
  PagePublicNotices,
} from '../Page';
import { PageTopics } from '../Page/PageTopics';
import { HideOnDesktop } from './HideOnDesktop';
import { ComponentProps } from 'react';

const BasePageMainContentFragment = gql(`
  fragment BasePageMainContent on BasePageWithSlug {
    ...PageBody
    ...PageEvents
    ...PagePublicNotices
    documents {
      ...DocumentList
    }

    contacts {
      ...ContactList
    }

    communities(orderBy:  {
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

    assemblyDistricts(orderBy:  {
       title: asc
    }) {
      ...PageList
    }

    orgUnits(orderBy:  {
       title: asc
    }) {
      ...PageList
    }

    topics(orderBy:  {
       title: asc
    }) {
      ...TopicList
    }

    ... on BasePageWithActions {
      actions(orderBy: {
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

export function BasePageMainContent(props: {
  pageBodyProps?: ComponentProps<typeof PageBody>;
  mapSlot?: React.ReactNode;
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  data?: FragmentType<typeof BasePageMainContentFragment> | null;
}) {
  const page = getFragmentData(BasePageMainContentFragment, props.data);

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

  return (
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

      <HideOnDesktop className="flex flex-col gap-8">
        {props.rightSide}

        <PageListItems
          title="Assembly Districts"
          items={page.assemblyDistricts}
        />
        <PageListItems title="Communities" items={page.communities} />
        <PageListItems title="Departments & Divisions" items={page.orgUnits} />
      </HideOnDesktop>

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
  );
}
