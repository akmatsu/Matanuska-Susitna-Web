import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageHeroImage } from './Page/PageHeroImage';
import {
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageListItems,
} from './Page';
import { PageTwoColumn } from './Page/PageTwoColumn';
import React, { ComponentProps } from 'react';

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
    events {
      id
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
}) {
  const page = getFragmentData(BasePageFragment, props.data);
  const ColumnControllerAs = props.columnControllerAs || PageTwoColumn;

  if (!page) return;

  return (
    <>
      {!props.hideHero && <PageHeroImage page={page} />}
      <PageContainer {...props.pageContainerProps}>
        <ColumnControllerAs
          rightSide={
            <>
              {props.mapSlot}
              {props.actionsSlot}
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
              {props.rightSide}
            </>
          }
        >
          <PageBody page={page} />
          {props.children}
          <PageListItems title="Related topics" items={page.topics} />
          <ul>
            {page.events?.map((event) => {
              return <li key={event.id}>{event.id}</li>;
            })}
          </ul>
        </ColumnControllerAs>
      </PageContainer>
    </>
  );
}
