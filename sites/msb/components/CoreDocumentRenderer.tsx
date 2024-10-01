import {
  DocumentRenderer,
  DocumentRendererProps,
} from '@keystone-6/document-renderer';
import Link from 'next/link';

export function CoreDocumentRenderer({
  componentBlocks,
  renderers,
  ...p
}: DocumentRendererProps) {
  return (
    <DocumentRenderer
      {...p}
      renderers={{
        ...renderers,
        inline: {
          link: (props) => {
            const isExternal = props.href.startsWith('http');

            return (
              <Link
                href={props.href}
                className={`usa-link${isExternal ? ' usa-link--external' : ''}`}
                target={isExternal ? '_blank' : '_self'}
                referrerPolicy={
                  isExternal ? 'no-referrer' : 'strict-origin-when-cross-origin'
                }
              >
                {props.children}
              </Link>
            );
          },
        },
      }}
      componentBlocks={{
        ...componentBlocks,

        table: (props: {
          headers: { props: { node: { children: [] } } }[];
          rows: {
            columns: { props: { node: { children: [] } } }[];
          }[];
        }) => {
          return (
            <table style={{ width: '100%' }}>
              <thead>
                {props.headers.map((header) => {
                  return (
                    <th>
                      <CoreDocumentRenderer
                        document={header.props.node.children}
                      />
                    </th>
                  );
                })}
              </thead>
              <tbody>
                {props.rows.map((row) => {
                  return (
                    <tr>
                      {row.columns.map((col) => (
                        <td>
                          <CoreDocumentRenderer
                            document={col.props.node.children}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        },
      }}
    />
  );
}
