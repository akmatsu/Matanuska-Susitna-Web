import React, { useEffect, useState } from 'react';
import {
  component,
  fields,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks';

export const table = component({
  label: 'Table',

  schema: {
    rows: fields.array(
      fields.array(
        fields.object({
          content: fields.child({ kind: 'block', placeholder: 'Cell...' }),
        }),
      ),
    ),
    headers: fields.array(
      fields.child({ kind: 'block', placeholder: 'Header...' }),
    ),
  },
  preview: function MyTable(props) {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(2);

    const adjustRowsForMaxRows = () => {
      const tableRows = props.fields.rows;
      if (tableRows.elements.length < rows) {
        addRow();
      }

      if (tableRows.elements.length > rows) {
        removeRow();
      }
    };

    const addRow = () => {
      props.fields.rows.onChange([
        ...props.fields.rows.elements.map((x) => ({ key: x.key })), // Keep existing rows
        ...Array.from(
          { length: rows - props.fields.rows.elements.length },
          () => ({
            key: undefined,
            value: Array.from({ length: cols }, () => ({ key: undefined })),
          }),
        ),
      ]);
    };

    const removeRow = () => {
      props.fields.rows.onChange([
        ...props.fields.rows.elements.slice(0, rows),
      ]);
    };

    const adjustTableCols = () => {
      props.onChange({
        // Add headers cells if length is less than cols
        ...(props.fields.headers.elements.length < cols && {
          headers: [
            ...props.fields.headers.elements,
            ...Array.from(
              { length: cols - props.fields.headers.elements.length },
              () => ({ key: undefined }),
            ),
          ],
        }),

        // Remove header cells if length is greater than cols
        ...(props.fields.headers.elements.length > cols && {
          headers: props.fields.headers.elements.slice(0, cols),
        }),

        // Add row cells if length is less than cols
        ...(props.fields.rows.elements.some(
          (x) => x.elements.length < cols,
        ) && {
          rows: props.fields.rows.elements.map((r) => ({
            key: r.key,
            value: [
              ...r.elements,
              ...Array.from({ length: cols - r.elements.length }, () => ({
                key: undefined,
              })),
            ],
          })),
        }),

        // Remove row cells if length is greater than cols.
        ...(props.fields.rows.elements.some(
          (x) => x.elements.length > cols,
        ) && {
          rows: props.fields.rows.elements.map((r) => ({
            key: r.key,
            value: r.elements.slice(0, cols),
          })),
        }),
      });
    };

    useEffect(() => {
      adjustRowsForMaxRows();
    }, [rows]);

    useEffect(() => {
      adjustTableCols();
    }, [cols]);

    // Render table rows and cells
    const renderTableRows = () => {
      return props.fields.rows.elements.map((row, rowIndex) => (
        <tr key={rowIndex} style={{ border: '1px solid black' }}>
          {row.elements.map((column, colIndex) => (
            <td key={colIndex} style={{ border: '1px solid black' }}>
              {column.fields.content.element}
            </td>
          ))}
        </tr>
      ));
    };

    const renderTableHeaders = () => {
      return props.fields.headers.elements.map((row, rowIndex) => (
        <th key={row.key} style={{ border: '1px solid black' }}>
          {row.element}
        </th>
      ));
    };

    return (
      <>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <NotEditable>
          <button onClick={() => setRows(rows + 1)}>Add a row</button>
          <button onClick={() => setRows(rows > 0 ? rows - 1 : rows)}>
            Remove a row
          </button>
          <button onClick={() => setCols(cols + 1)}>Add a column</button>
          <button onClick={() => setCols(cols > 0 ? cols - 1 : cols)}>
            Remove a column
          </button>
        </NotEditable>
      </>
    );
  },
});
