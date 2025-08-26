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

  if (documents.length > 3)
    return (
      <ul className="flex gap-2 flex-wrap">
        {documents.map((doc) => (
          <DocumentLinkButton key={doc.id} data={doc} blockOnMobile />
        ))}
      </ul>
    );

  return (
    <DropdownButton
      buttonProps={{
        blockOnMobile: true,
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
