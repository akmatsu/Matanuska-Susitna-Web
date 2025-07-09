import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';
import clsx from 'clsx';

const DocumentFields = gql(`
  fragment DocumentFields on Document {
    id
    title
    file {
      filename
      url
      filesize
    }
  }
`);

export function DocumentButton(props: {
  document: FragmentType<typeof DocumentFields>;
}) {
  const doc = getFragmentData(DocumentFields, props.document);
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
      color="primary"
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
