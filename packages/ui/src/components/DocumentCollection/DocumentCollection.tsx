import { ReactNode } from 'react';
import { Button } from '../Button';
import clsx from 'clsx';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';
import { React } from 'next/dist/server/route-modules/app-page/vendored/rsc/entrypoints';

const documentCollectionFragment = gql(`
  fragment DocumentCollectionDisplay on DocumentCollection {
    title
    documents(orderBy:  {
       title: asc
    }) {
      id
      ...DocumentButton
    }
  }
`);

export function DocumentCollection({
  collection,
  linkStyle = 'button',
  hideTitle = false,
  centerLabel = true,
}: {
  collection: FragmentType<typeof documentCollectionFragment>;
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
  linkStyle,
  centerLabel,
}: {
  document: FragmentType<typeof documentButtonFragment>;
  linkStyle: 'button' | 'link';
  centerLabel: boolean;
}) {
  const doc = getFragmentData(documentButtonFragment, document);

  const fileType = doc.file?.filename.split('.').pop()?.toUpperCase();
  const isInternal =
    doc.file?.url.includes('matsu.gov') ||
    doc.file?.url.includes('matsugov.us') ||
    doc.file?.url.includes('msb-cms-documents.s3.us-west-2.amazonaws.com');

  const target = isInternal ? '_parent' : '_blank';
  const download = fileType === 'PDF' ? undefined : doc.file?.filename;
  const className = clsx('flex items-center gap-1', {
    'justify-between': !centerLabel,
  });

  const Ln = (props: { children?: ReactNode }) => (
    <Link
      href={doc.file?.url!}
      target={target}
      download={download}
      className={className}
      {...props}
    />
  );

  const Btn = (p: { children?: ReactNode }) => {
    if (linkStyle === 'link') return <Ln>{p.children}</Ln>;
    else
      return (
        <Button asChild block className={className} color="primary">
          <Ln>{p.children}</Ln>
        </Button>
      );
  };

  return (
    <li className="my-2">
      <Btn>
        <span>
          <span>
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
      </Btn>
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
