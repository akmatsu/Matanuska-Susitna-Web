import { DocumentRendererProps } from '@keystone-6/document-renderer';

export function CoreDocumentRenderer({
  componentBlocks,
  ...p
}: DocumentRendererProps) {
  return (
    <CoreDocumentRenderer
      {...p}
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
