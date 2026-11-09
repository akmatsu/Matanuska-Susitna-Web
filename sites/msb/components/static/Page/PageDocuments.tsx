import { DropdownButton } from '@matsugov/ui';
import {
  DocumentLinkButtonView,
  toDocumentLinkData,
  type DocumentLinkData,
} from '../DocumentLink';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const documentListFragment = gql(`
  fragment DocumentList on Document {
    id
    title
    file {
      url
    }
    ...DocumentLink
  }
`);

export type DocumentListData = DocumentLinkData & { id: string };

export function PageDocumentsView(props: {
  documents?: DocumentListData[] | null;
}) {
  const { documents } = props;
  if (!documents?.length) return null;

  if (documents.length <= 2)
    return (
      <ul className="flex flex-col gap-2">
        {documents.map((doc) => (
          <DocumentLinkButtonView key={doc.id} document={doc} block />
        ))}
      </ul>
    );

  return (
    <DropdownButton
      buttonProps={{
        block: true,
      }}
      label="View Documents"
      items={documents.map((doc) => ({
        label: doc.title || '',
        href: doc.url ?? undefined,
        value: doc.id,
      }))}
    />
  );
}

type DocumentListRef = FragmentType<typeof documentListFragment>;

/** Maps the Keystone GraphQL document list fragment to view data. */
export function toDocumentListData(ref: DocumentListRef): DocumentListData {
  const doc = getFragmentData(documentListFragment, ref);
  return { id: doc.id, ...toDocumentLinkData(doc) };
}

export function PageDocuments(props: { documents?: DocumentListRef[] | null }) {
  return (
    <PageDocumentsView documents={props.documents?.map(toDocumentListData)} />
  );
}
