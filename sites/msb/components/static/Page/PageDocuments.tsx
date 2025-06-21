import { PageSection } from './PageSection';

import { DocumentButton } from './DocumentButton';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const documentListFragment = gql(`
  fragment DocumentList on Document {
    id
    ...DocumentFields
  }
`);

export function PageDocuments(props: {
  documents?: FragmentType<typeof documentListFragment>[] | null;
}) {
  const documents = getFragmentData(documentListFragment, props.documents);
  if (documents?.length)
    return (
      <PageSection title="Documents">
        <ul className="flex flex-col gap-2">
          {documents.map((doc) => (
            <DocumentButton key={doc.id} document={doc} />
          ))}
        </ul>
      </PageSection>
    );
}
