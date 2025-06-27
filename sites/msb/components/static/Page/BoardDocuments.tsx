import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { DocumentLink } from './DocumentLink';

const boardDocumentListFragment = gql(`
  fragment BoardDocumentList on Document {
    id
    ...BoardDocumentLink
  }
`);

const parliTrainingLinkFragment = gql(`
  fragment ParliTrainingLink on ExternalLink {
    label
    url {
      title
      url
    }
  }
`);

export function BoardDocuments(props: {
  documents?: FragmentType<typeof boardDocumentListFragment>[] | null;
  parliTrainingLink?: FragmentType<typeof parliTrainingLinkFragment> | null;
}) {
  const docs = getFragmentData(boardDocumentListFragment, props.documents);
  const parliTrainingLink = getFragmentData(
    parliTrainingLinkFragment,
    props.parliTrainingLink,
  );

  return (
    <ul className="list-disc list-inside">
      {docs?.map((doc) => (
        <li key={doc.id} className="list-disc list-inside">
          <DocumentLink document={doc} />
        </li>
      ))}
      {parliTrainingLink?.url?.url && (
        <li className="list-disc list-inside">
          <a
            href={parliTrainingLink.url.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {parliTrainingLink.label || parliTrainingLink.url.title}
          </a>
        </li>
      )}
    </ul>
  );
}
