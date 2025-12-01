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

export function PageBody(props: {
  noProse?: boolean;
  page?: FragmentType<typeof pageBodyFragment> | null;
  hideType?: boolean;
  actionSlot?: React.ReactNode;
}) {
  const page = getFragmentData(pageBodyFragment, props.page);
  if (!page?.body && !page?.description && !page?.title) {
    return null;
  }

  return (
    <ProseWrapper noProse={props.noProse}>
      {!props.hideType && (
        <p className="text-bold capitalize text-base-dark! font-bold text-2xl not-prose">
          {page.__typename?.split(/(?=[A-Z])/).join(' ')}
        </p>
      )}
      <h1 className="text-3xl">{page.title}</h1>
      {props.actionSlot}
      {page.body ? (
        <MarkdownRenderer>{page.body}</MarkdownRenderer>
      ) : page.description ? (
        <p>{page.description}</p>
      ) : undefined}
    </ProseWrapper>
  );
}
