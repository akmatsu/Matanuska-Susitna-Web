'use client';
import {
  DocumentLinkView,
  type DocumentLinkData,
} from '@/components/static/DocumentLink';
import { Button, Pagination } from '@matsugov/ui';
import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export const DOC_COLLECTION_PAGE_SIZE = 5;

/**
 * The document collection box: title, sort toggle, document list and
 * pagination. It holds no state, so both the Keystone (server-paginated)
 * and REST (client-paginated) versions can use it.
 */
export function DocCollectionFrame(props: {
  title?: string | null;
  documents: (DocumentLinkData & { id: string })[];
  direction: SortDirection;
  onToggleDirection: () => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <span className="not-prose block border border-black">
      <span className="bg-msb-base-lightest block flex justify-between border-b border-black p-2">
        <span className="font-semibold">{props.title}</span>
        <Button
          icon
          size="sm"
          onClick={props.onToggleDirection}
          title="Toggle Sort"
        >
          {props.direction === 'asc' ? (
            <span className="icon-[mdi--sort-alphabetical-ascending] size-6" />
          ) : (
            <span className="icon-[mdi--sort-alphabetical-descending] size-6" />
          )}
        </Button>
      </span>
      <span className="block">
        <ul>
          {props.documents.map((doc) => (
            <li
              key={doc.id}
              className="border-b border-black p-2 last:border-0"
            >
              <DocumentLinkView document={doc} />
            </li>
          ))}
        </ul>
      </span>
      {props.totalPages > 1 && (
        <span className="footer flex justify-center border-t border-black p-2">
          <Pagination
            currentPage={props.page}
            totalPages={props.totalPages}
            onLinkClick={(p) => props.onPageChange(Number(p))}
            size="xs"
          />
        </span>
      )}
    </span>
  );
}

/**
 * A document collection whose documents are all known up front (from the
 * CMS REST API). Sorting and paging happen in the browser.
 */
export function DocCollectionView(props: {
  title?: string | null;
  documents: (DocumentLinkData & { id: string })[];
}) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<SortDirection>('asc');

  const sorted = [...props.documents].sort((a, b) =>
    direction === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title),
  );
  const totalPages = Math.ceil(sorted.length / DOC_COLLECTION_PAGE_SIZE);
  const start = (page - 1) * DOC_COLLECTION_PAGE_SIZE;

  return (
    <DocCollectionFrame
      title={props.title}
      documents={sorted.slice(start, start + DOC_COLLECTION_PAGE_SIZE)}
      direction={direction}
      onToggleDirection={() =>
        setDirection(direction === 'asc' ? 'desc' : 'asc')
      }
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
