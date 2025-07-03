import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { DocumentLink } from './DocumentLink';

const boardDocumentListFragment = gql(`
  fragment BoardDocumentList on Document {
    id
    ...BoardDocumentLink
  }
`);

export function BoardDocuments(props: {
  documents?: FragmentType<typeof boardDocumentListFragment>[] | null;
}) {
  const docs = getFragmentData(boardDocumentListFragment, props.documents);

  return (
    <ul className="list-disc list-inside">
      {docs?.map((doc) => (
        <li key={doc.id} className="list-disc list-inside">
          <DocumentLink document={doc} />
        </li>
      ))}
    </ul>
  );
}
