import { DropdownButton } from '@matsugov/ui';
import { DocumentLinkButton } from '../DocumentLink';
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

export function PageDocuments(props: {
  documents?: FragmentType<typeof documentListFragment>[] | null;
}) {
  const documents = getFragmentData(documentListFragment, props.documents);
  if (!documents?.length) return null;

  if (documents.length <= 2)
    return (
      <ul className="flex flex-col gap-2">
        {documents.map((doc) => (
          <DocumentLinkButton key={doc.id} data={doc} block />
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
        href: doc.file?.url,
        value: doc.id,
      }))}
    />
  );
}
