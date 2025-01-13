import type { GetDocCollectionData } from '@msb/js-sdk';
import { ComponentProps, ElementType } from 'react';
import { Button } from '../Button';
import clsx from 'clsx';

export function DocumentCollection({
  collection,
  linkAs = 'a',
  linkStyle = 'button',
  hideTitle = false,
  centerLabel = true,
}: {
  collection: GetDocCollectionData['documentCollection'];
  linkAs?: ElementType;
  linkStyle?: 'button' | 'link';
  hideTitle?: boolean;
  label?: string;
  centerLabel?: boolean;
}) {
  return (
    <div className="w-full">
      {!hideTitle && <h4 className="text-xl">{collection.title}</h4>}
      <ul className="not-prose w-full">
        {collection.documents.map((document) => (
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

function Document({
  document,
  linkAs,
  linkStyle,
  centerLabel,
}: {
  document: GetDocCollectionData['documentCollection']['documents'][number];
  linkAs: ElementType;
  linkStyle: 'button' | 'link';
  centerLabel: boolean;
}) {
  const Link =
    linkStyle === 'link'
      ? linkAs
      : (props: ComponentProps<typeof Button>) => (
          <Button block as={linkAs} {...props}></Button>
        );

  const fileType = document.file.filename.split('.').pop()?.toUpperCase();
  const isInternal =
    document.file.url.includes('matsu.gov') ||
    document.file.url.includes('matsugov.us') ||
    document.file.url.includes('msb-cms-documents.s3.us-west-2.amazonaws.com');

  return (
    <li key={document.id} className="my-2">
      <Link
        href={document.file.url}
        className={clsx('flex items-center gap-1 flex-nowrap', {
          'justify-between': !centerLabel,
        })}
        target={isInternal ? '_parent' : '_blank'}
        download={fileType === 'PDF' ? undefined : document.file.filename}
      >
        <span className="truncate">
          <span className="truncate">
            {fileType === 'PDF' ? 'View' : 'Download'} {document.title} {''}
          </span>
          <span className="text-xs">
            ({fileType} | {formatFileSize(document.file.filesize)})
          </span>
        </span>
        <span
          className={clsx('iconify flex-none', {
            'mdi--download': fileType !== 'PDF',
            'mdi--external-link': fileType === 'PDF' && !isInternal,
            'mdi--eye': fileType === 'PDF' && isInternal,
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
