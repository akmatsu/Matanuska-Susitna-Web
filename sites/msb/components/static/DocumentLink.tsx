import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import React, { ComponentProps, ElementType } from 'react';
import { LinkButton } from './LinkButton';
import { Link } from './Link';
import clsx from 'clsx';

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

type DocumentLinkProps<C extends ElementType> = {
  as?: C;
  data?: FragmentType<typeof documentLinkFragment> | null;
  hideIcon?: boolean;
} & Omit<ComponentProps<C>, 'href' | 'hideExternalIcon'>;

export function DocumentLink<C extends ElementType = typeof Link>({
  data: propsData,
  target = '_blank',
  rel = 'noopener noreferrer',
  hideIcon = false,
  children,
  as,
  ...props
}: DocumentLinkProps<C>) {
  const data = getFragmentData(documentLinkFragment, propsData);

  if (!data?.file?.url) {
    return null;
  }

  const fileType = getFileType(data?.file?.filename);
  const isInternal = checkIsInternal(data?.file?.url);
  const isArchive = data?.tagsCount ? data.tagsCount > 0 : false;

  const Comp = as ?? Link;

  return (
    <Comp
      href={data?.file?.url}
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
        (data?.title || data?.file?.filename)?.replace(/^\d+\s?-?.?\s/g, '')}
      {isArchive && (
        <div className="bg-secondary ml-1 flex items-center justify-center rounded px-1 text-xs text-black">
          Archive
        </div>
      )}
    </Comp>
  );
}

type DocumentLinkButtonProps = Omit<ComponentProps<typeof LinkButton>, 'href'> &
  DocumentLinkProps<typeof LinkButton>;

export function DocumentLinkButton(props: DocumentLinkButtonProps) {
  return <DocumentLink as={LinkButton} {...props} />;
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
