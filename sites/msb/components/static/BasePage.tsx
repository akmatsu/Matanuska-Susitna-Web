import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import React from 'react';
import { MarkdownRenderer } from '@components/server/MarkdownRenderer';
import { toHeroImage } from './Page/PageHeroImage';
import { InternalActionsList, toExternalActionData } from './Page/PageActions';
import { toPageBodyData } from './Page/PageBody';
import { toContactListData } from './Page/PageContacts';
import { toDocumentListData } from './Page/PageDocuments';
import { toPageEventsData } from './Page/PageEvents';
import { toPageListData } from './Page/PageListItems';
import { toPagePublicNoticesData } from './Page/PagePublicNotices';
import { toTopicListData } from './Page/PageTopics';
import {
  ContentPageLayout,
  type ContentPageLayoutProps,
} from './ContentPageLayout';

const BasePageFragment = gql(`
  fragment BasePageInfo on BasePageWithSlug {
    id
    
    __typename
    ...PageBody
    ...HeroImage
    contacts(orderBy:  {
       name: asc
    }) {
      ...ContactList
    }
    documents {
      ...DocumentList
    }
    ...PageEvents
    ...PagePublicNotices
    hideSideNav

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

/**
 * The standard content page for Keystone GraphQL pages. It maps the
 * `BasePageInfo` fragment to `ContentPageLayout`, which REST pages use
 * directly.
 */
export function BasePage(
  props: {
    data?: FragmentType<typeof BasePageFragment> | null;
  } & Omit<
    ContentPageLayoutProps,
    'page' | 'body' | 'internalActions' | 'hasInternalActions'
  >,
) {
  const { data, ...layoutProps } = props;
  const page = getFragmentData(BasePageFragment, data);

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

  const { body, ...bodyData } = toPageBodyData(page);

  return (
    <ContentPageLayout
      {...layoutProps}
      page={{
        id: page.id,
        pageType: page.__typename,
        ...bodyData,
        heroImage: toHeroImage(page),
        hideSideNav: page.hideSideNav,
        primaryAction: primaryAction
          ? toExternalActionData(primaryAction)
          : null,
        secondaryActions: secondaryActions?.map(toExternalActionData),
        documents: page.documents?.map(toDocumentListData),
        primaryContact: primaryContact
          ? toContactListData(primaryContact)
          : null,
        contacts: page.contacts?.map(toContactListData),
        events: toPageEventsData(page as any),
        publicNotices: toPagePublicNoticesData(page as any),
        topics: topics?.map(toTopicListData),
        services: services?.map(toPageListData),
        communities: communities?.map(toPageListData),
        orgUnits: orgUnits?.map(toPageListData),
        assemblyDistricts: assemblyDistricts?.map(toPageListData),
        plans: plans?.map(toPageListData),
      }}
      body={body ? <MarkdownRenderer>{body}</MarkdownRenderer> : null}
      internalActions={<InternalActionsList actions={actions} />}
      hasInternalActions={!!actions?.length}
    />
  );
}
