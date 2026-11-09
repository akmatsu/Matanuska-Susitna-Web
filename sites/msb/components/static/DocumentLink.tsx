import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import React, { ComponentProps, ElementType } from 'react';
import { LinkButton } from './LinkButton';
import { Link } from './Link';
import clsx from 'clsx';
import type { CmsDocument } from '@msb/cms-sdk';

const documentLinkFragment = gql(`
  fragment DocumentLink on Document {
    title
    file {
      filename
      url
    }
    tagsCount (where:  {
       id:  {
          equals: "cmj28e98u000ffbssetb09ir8"
       }
    })
  }
`);

/** The document fields a link shows. Shaped like the CMS REST API's document. */
export type DocumentLinkData = Pick<CmsDocument, 'title' | 'url' | 'filename'>;

type DocumentLinkBaseProps<C extends ElementType> = {
  as?: C;
  hideIcon?: boolean;
} & Omit<ComponentProps<C>, 'href' | 'hideExternalIcon'>;

type DocumentLinkViewProps<C extends ElementType> = DocumentLinkBaseProps<C> & {
  document?: DocumentLinkData | null;
};

type DocumentLinkProps<C extends ElementType> = DocumentLinkBaseProps<C> & {
  data?: FragmentType<typeof documentLinkFragment> | null;
};

export function DocumentLinkView<C extends ElementType = typeof Link>({
  document,
  target = '_blank',
  rel = 'noopener noreferrer',
  hideIcon = false,
  children,
  as,
  ...props
}: DocumentLinkViewProps<C>) {
  if (!document?.url) {
    return null;
  }

  const fileType = getFileType(document.filename);
  const isInternal = checkIsInternal(document.url);
  // const isArchive = data?.tagsCount ? data.tagsCount > 0 : false;

  const Comp = as ?? Link;

  return (
    <Comp
      href={document.url}
      {...props}
      target={target}
      rel={rel}
      hideExternalIcon
      className={clsx(
        {
          'after:-mb-0.5 after:ml-1': !hideIcon,
          'after:icon-[mdi--download]': fileType !== 'PDF' && !hideIcon,
          'after:icon-[mdi--external-link]':
            fileType === 'PDF' && !isInternal && !hideIcon,
          'after:icon-[mdi--document]':
            fileType === 'PDF' && isInternal && !hideIcon,
        },
        props.className,
      )}
    >
      {children ||
        (document.title || document.filename)?.replace(/^\d+\s?-?.?\s/g, '')}
    </Comp>
  );
}

/** Maps the Keystone GraphQL document fragment to view data. */
export function toDocumentLinkData(
  data: FragmentType<typeof documentLinkFragment>,
): DocumentLinkData {
  const doc = getFragmentData(documentLinkFragment, data);
  return {
    title: doc.title ?? '',
    url: doc.file?.url ?? null,
    filename: doc.file?.filename ?? null,
  };
}

export function DocumentLink<C extends ElementType = typeof Link>({
  data,
  ...props
}: DocumentLinkProps<C>) {
  return (
    <DocumentLinkView<C>
      {...(props as DocumentLinkBaseProps<C>)}
      document={data ? toDocumentLinkData(data) : null}
    />
  );
}

type DocumentLinkButtonProps = Omit<ComponentProps<typeof LinkButton>, 'href'> &
  DocumentLinkProps<typeof LinkButton>;

export function DocumentLinkButton(props: DocumentLinkButtonProps) {
  return <DocumentLink as={LinkButton} {...props} />;
}

type DocumentLinkButtonViewProps = Omit<
  ComponentProps<typeof LinkButton>,
  'href'
> &
  DocumentLinkViewProps<typeof LinkButton>;

export function DocumentLinkButtonView(props: DocumentLinkButtonViewProps) {
  return <DocumentLinkView as={LinkButton} {...props} />;
}

function checkIsInternal(url?: string | null) {
  return (
    url?.includes('matsu.gov') ||
    url?.includes('matsugov.us') ||
    url?.includes('msb-cms-documents.s3.us-west-2.amazonaws.com') ||
    (process.env.NODE_ENV === 'development' && url?.includes('localhost'))
  );
}

function getFileType(filename?: string | null) {
  return filename?.split('.').pop()?.toUpperCase();
}
