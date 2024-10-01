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
          headers: { key: string; props: { node: { children: [] } } }[];
          tableRows: {
            content: {
              key: string;
              props: {
                node: { children: [] };
              };
            };
          }[][];
        }) => {
          return (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  {props.headers.map((header) => {
                    return (
                      <th key={header.key}>
                        <CoreDocumentRenderer
                          document={header.props.node.children}
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {props.tableRows.map((row, index) => {
                  return (
                    <tr key={index}>
                      {row.map((cell) => {
                        return (
                          <td key={cell.content.key}>
                            <CoreDocumentRenderer
                              document={cell.content.props.node.children}
                            />
                          </td>
                        );
                      })}
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
