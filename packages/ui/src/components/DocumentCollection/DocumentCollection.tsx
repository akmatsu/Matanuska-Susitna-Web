import { ComponentProps, ElementType } from 'react';
import { Button } from '../Button';
import clsx from 'clsx';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const documentCollectionFragment = gql(`
  fragment DocumentCollectionDisplay on DocumentCollection {
    title
    documents {
      id
      ...DocumentButton
    }
  }
`);

export function DocumentCollection({
  collection,
  linkAs = 'a',
  linkStyle = 'button',
  hideTitle = false,
  centerLabel = true,
}: {
  collection: FragmentType<typeof documentCollectionFragment>;
  linkAs?: ElementType;
  linkStyle?: 'button' | 'link';
  hideTitle?: boolean;
  label?: string;
  centerLabel?: boolean;
}) {
  const collectionData = getFragmentData(
    documentCollectionFragment,
    collection,
  );

  return (
    <div className="w-full">
      {!hideTitle && <h4 className="text-xl">{collectionData?.title}</h4>}
      <ul className="not-prose w-full">
        {collectionData?.documents?.map((document) => (
          <Document
            document={document}
            linkAs={linkAs}
            linkStyle={linkStyle}
            centerLabel={centerLabel}
            key={document.id}
          />
        ))}
      </ul>
    </div>
  );
}

const documentButtonFragment = gql(`
  fragment DocumentButton on Document {
    title
    file {
      url 
      filename
      filesize
    }
  }
`);

function Document({
  document,
  linkAs,
  linkStyle,
  centerLabel,
}: {
  document: FragmentType<typeof documentButtonFragment>;
  linkAs: ElementType;
  linkStyle: 'button' | 'link';
  centerLabel: boolean;
}) {
  const doc = getFragmentData(documentButtonFragment, document);
  const Link =
    linkStyle === 'link'
      ? linkAs
      : (props: ComponentProps<typeof Button>) => (
          <Button block as={linkAs} {...props}></Button>
        );

  const fileType = doc.file?.filename.split('.').pop()?.toUpperCase();
  const isInternal =
    doc.file?.url.includes('matsu.gov') ||
    doc.file?.url.includes('matsugov.us') ||
    doc.file?.url.includes('msb-cms-documents.s3.us-west-2.amazonaws.com');

  return (
    <li className="my-2">
      <Link
        href={doc.file?.url}
        className={clsx('flex items-center gap-1 flex-nowrap', {
          'justify-between': !centerLabel,
        })}
        target={isInternal ? '_parent' : '_blank'}
        download={fileType === 'PDF' ? undefined : doc.file?.filename}
        color="primary"
      >
        <span className="truncate">
          <span className="truncate">
            {doc.title} {''}
          </span>
          <span className="text-xs">
            ({fileType} |{' '}
            {doc.file?.filesize && formatFileSize(doc.file?.filesize)})
          </span>
        </span>
        <span
          className={clsx('flex-none', {
            'icon-[mdi--download]': fileType !== 'PDF',
            'icon-[mdi--external-link]': fileType === 'PDF' && !isInternal,
            'icon-[mdi--eye]': fileType === 'PDF' && isInternal,
          })}
        ></span>
      </Link>
    </li>
  );
}

function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.round(size * 10) / 10} ${units[unitIndex]}`;
}
