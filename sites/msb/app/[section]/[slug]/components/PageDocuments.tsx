import { Document } from '@msb/js-sdk';
import { LinkButton } from '../../../../components/LinkButton';
import clsx from 'clsx';

export function PageDocuments({ documents }: { documents: Document[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      <ul className="flex flex-col gap-2">
        {documents.map((doc) => (
          <DocumentButton key={doc.id} doc={doc} />
        ))}
      </ul>
    </section>
  );
}

function DocumentButton({ doc }: { doc: Document }) {
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
