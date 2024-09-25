import React from 'react';
import {
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks';

export const table = component({
  label: 'Table',
  schema: {
    cols: fields.integer({
      label: 'Number of Columns',
      defaultValue: 2,
    }),
    rows: fields.integer({
      label: 'Number of rows',
      defaultValue: 2,
    }),
    content: fields.array(fields.child({ kind: 'block', placeholder: '...' })),
  },
  preview: function Table(props) {
    const tableRows = Array.from({length: props.fields.rows.})
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {/* <thead>
          <th style={{ border: '1px solid #000000' }}>
            {props.fields.content.elements[0].element}
          </th>
          <th style={{ border: '1px solid #000000' }}>
            {props.fields.content.elements[1].element}
          </th>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[2].element}
            </td>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[4].element}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[5].element}
            </td>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[6].element}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[7].element}
            </td>
            <td style={{ border: '1px solid #000000' }}>
              {props.fields.content.elements[8].element}
            </td>
          </tr>
        </tbody> */}
      </table>
    );
  },
});
