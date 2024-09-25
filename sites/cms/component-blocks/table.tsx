import React from 'react';
import {
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks';

export const table = component({
  label: 'Table',
  schema: {
    headers: fields.array(
      fields.child({ kind: 'block', placeholder: 'Header...' }),
      { label: 'Headers', itemLabel: (props) => 'Header' },
    ),
    rows: fields.array(
      fields.object({
        columns: fields.array(
          fields.child({ kind: 'block', placeholder: 'Column...' }),
        ),
      }),
      { label: 'Rows', itemLabel: (props) => 'Row' },
    ),
  },
  preview: function Table(props) {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {props.fields.headers.elements.map((el) => (
            <th style={{ border: '1px solid #000000' }}>{el.element}</th>
          ))}
        </thead>
        <tbody>
          {props.fields.rows.elements.map((row) => (
            <tr>
              {row.fields.columns.elements.map((col) => (
                <td style={{ border: '1px solid #000000' }}>{col.element}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
});
