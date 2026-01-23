import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { DocumentLink } from '../DocumentLink';
import { Link } from '../Link';

const boardDocumentListFragment = gql(`
  fragment BoardDocumentList on Document {
    id
    ...DocumentLink
  }
`);

const boardParliTrainingLinkFragment = gql(`
  fragment BoardParliTrainingLink on ExternalLink {
    label
    url {
      title
      url
    }
  }
`);

export function BoardDocuments(props: {
  documents?: FragmentType<typeof boardDocumentListFragment>[] | null;
  parliTrainingLink?: FragmentType<
    typeof boardParliTrainingLinkFragment
  > | null;
}) {
  const docs = getFragmentData(boardDocumentListFragment, props.documents);
  const parliTrainingLink = getFragmentData(
    boardParliTrainingLinkFragment,
    props.parliTrainingLink,
  );

  return (
    <ul className="list-disc list-inside">
      {parliTrainingLink?.url?.url && (
        <li>
          <Link
            href={parliTrainingLink.url?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {parliTrainingLink.label || parliTrainingLink.url.title}
          </Link>
        </li>
      )}
      {docs?.map((doc) => (
        <li key={doc.id} className="list-disc list-inside">
          <DocumentLink data={doc} />
        </li>
      ))}
    </ul>
  );
}
