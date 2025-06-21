import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';

const boardDocumentLink = gql(`
  fragment BoardDocumentLink on Document {
    title
    file {
      url
    }
  }
`);

export function DocumentLink(document: {
  document: FragmentType<typeof boardDocumentLink>;
}) {
  const doc = getFragmentData(boardDocumentLink, document.document);
  if (!doc || !doc.file || !doc.file.url || !doc.title) {
    return null;
  }

  return (
    <Link href={doc.file.url} target="_blank" rel="noopener noreferrer">
      {doc.title}
    </Link>
  );
}
