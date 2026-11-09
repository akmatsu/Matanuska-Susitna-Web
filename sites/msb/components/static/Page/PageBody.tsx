import { MarkdownRenderer } from '@components/server/MarkdownRenderer';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ProseWrapper } from '../ProseWrapper';
import React from 'react';

const pageBodyFragment = gql(`
  fragment PageBody on BasePage {
    __typename
    title
    body
    description
  }
`);

export type PageBodyViewProps = {
  noProse?: boolean;
  hideType?: boolean;
  actionSlot?: React.ReactNode;
  /** Shown above the title, e.g. "Service". */
  typeLabel?: string;
  title?: string | null;
  description?: string | null;
  /**
   * The rendered rich text. Pass nothing when there is no content, so the
   * description is shown instead.
   */
  children?: React.ReactNode;
};

export function PageBodyView(props: PageBodyViewProps) {
  if (!props.children && !props.description) {
    return null;
  }

  return (
    <ProseWrapper noProse={props.noProse}>
      {!props.hideType && (
        <p className="text-bold text-msb-base-dark! not-prose text-2xl font-bold capitalize">
          {props.typeLabel}
        </p>
      )}
      <h1 className="text-3xl">{props.title?.split(' --- ')[0]}</h1>
      {props.actionSlot}
      {props.children ? (
        props.children
      ) : props.description ? (
        <p>{props.description}</p>
      ) : undefined}
    </ProseWrapper>
  );
}

type PageBodyRef = FragmentType<typeof pageBodyFragment>;

/** Splits a GraphQL type name into a label, e.g. "OrgUnit" to "Org Unit". */
export function typeLabelFromTypename(typename?: string) {
  return typename?.split(/(?=[A-Z])/).join(' ');
}

/** Maps the Keystone GraphQL page body fragment to view data. */
export function toPageBodyData(ref: PageBodyRef) {
  const page = getFragmentData(pageBodyFragment, ref);
  return {
    typeLabel: typeLabelFromTypename(page.__typename),
    title: page.title,
    description: page.description,
    body: page.body,
  };
}

export function PageBody(
  props: Omit<
    PageBodyViewProps,
    'typeLabel' | 'title' | 'description' | 'children'
  > & {
    page?: PageBodyRef | null;
  },
) {
  const { page: pageRef, ...viewProps } = props;
  if (!pageRef) return null;
  const { body, ...page } = toPageBodyData(pageRef);

  return (
    <PageBodyView {...viewProps} {...page}>
      {body ? <MarkdownRenderer>{body}</MarkdownRenderer> : null}
    </PageBodyView>
  );
}
