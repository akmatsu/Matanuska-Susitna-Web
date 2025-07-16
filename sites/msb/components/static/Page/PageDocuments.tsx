import { DocumentLinkButton } from '../DocumentLink';
import { PageSection } from './PageSection';

import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const documentListFragment = gql(`
  fragment DocumentList on Document {
    id
    ...DocumentLink
  }
`);

export function PageDocuments(props: {
  documents?: FragmentType<typeof documentListFragment>[] | null;
}) {
  const documents = getFragmentData(documentListFragment, props.documents);
  if (documents?.length)
    return (
      <PageSection title="Documents" noMargins>
        <ul className="flex flex-col gap-2">
          {documents.map((doc) => (
            <DocumentLinkButton key={doc.id} data={doc} />
          ))}
        </ul>
      </PageSection>
    );
}
