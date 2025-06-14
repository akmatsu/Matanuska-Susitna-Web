import { LinkButton } from '@/components/static/LinkButton';
import clsx from 'clsx';
import { PageSection } from './PageSection';
import { DocumentFieldsFragment } from '@msb/js-sdk/types';

export function PageDocuments({
  documents,
}: {
  documents?: DocumentFieldsFragment[] | null;
}) {
  if (documents?.length)
    return (
      <PageSection title="Documents">
        <ul className="flex flex-col gap-2">
          {documents.map((doc) => (
            <DocumentButton key={doc.id} doc={doc} />
          ))}
        </ul>
      </PageSection>
    );
}

function DocumentButton({ doc }: { doc: DocumentFieldsFragment }) {
  if (!doc.file || !doc.file.filename || !doc.file.url) {
    return null;
  }
  const fileType = doc.file.filename.split('.').pop()?.toUpperCase();
  const isInternal =
    doc.file.url.includes('matsu.gov') ||
    doc.file.url.includes('matsugov.us') ||
    doc.file.url.includes('msb-cms-documents.s3.us-west-2.amazonaws.com') ||
    (process.env.NODE_ENV === 'development' &&
      doc.file.url.includes('localhost'));

  return (
    <LinkButton
      href={doc.file.url}
      className="margin-right-0 usa-link--external"
      target="_blank"
      big
      block
      key={doc.id}
      title={fileType === 'PDF' ? 'View PDF' : 'Download Document'}
    >
      <span className="flex items-center gap-1">
        {doc.title}{' '}
        <span
          className={clsx('flex-none', {
            'icon-[mdi--download]': fileType !== 'PDF',
            'icon-[mdi--external-link]': fileType === 'PDF' && !isInternal,
            'icon-[mdi--eye]': fileType === 'PDF' && isInternal,
          })}
        />
      </span>
    </LinkButton>
  );
}
