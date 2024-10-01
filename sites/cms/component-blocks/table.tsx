import React, { useEffect, useState } from 'react';
import {
  component,
  fields,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks';

export const table = component({
  label: 'Table',
  chromeless: true,
  schema: {
    rows: fields.array(
      fields.array(
        fields.object({
          content: fields.child({ kind: 'block', placeholder: 'Field...' }),
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

    useEffect(() => {
      adjustRowsForMaxRows();
    }, [rows]);

    useEffect(() => {
      adjustTableCols();
    }, [cols]);

    function adjustRowsForMaxRows() {
      const tableRows = props.fields.rows;
      if (tableRows.elements.length < rows) {
        addRow();
      }

      if (tableRows.elements.length > rows) {
        removeRow();
      }
    }

    function adjustTableCols() {
      const tooFewHeaders = props.fields.headers.elements.length < cols;
      const tooManyHeaders = props.fields.headers.elements.length > cols;
      const tooFewBodyCols = props.fields.rows.elements.some(
        (x) => x.elements.length < cols,
      );
      const tooManyBodyCols = props.fields.rows.elements.some(
        (x) => x.elements.length > cols,
      );

      props.onChange({
        ...(tooFewHeaders && addHeaderCol()),
        ...(tooManyHeaders && removeHeaderCol()),
        ...(tooFewBodyCols && addBodyCol()),
        ...(tooManyBodyCols && removeBodyCol()),
      });
    }

    function addBodyCol() {
      return {
        rows: props.fields.rows.elements.map((r) => ({
          key: r.key,
          value: [
            ...r.elements,
            ...Array.from({ length: cols - r.elements.length }, () => ({
              key: undefined,
            })),
          ],
        })),
      };
    }

    function removeBodyCol() {
      return {
        rows: props.fields.rows.elements.map((r) => ({
          key: r.key,
          value: r.elements.slice(0, cols),
        })),
      };
    }

    function addHeaderCol() {
      return {
        headers: [
          ...props.fields.headers.elements,
          ...Array.from(
            { length: cols - props.fields.headers.elements.length },
            () => ({ key: undefined }),
          ),
        ],
      };
    }

    function removeHeaderCol() {
      return {
        headers: props.fields.headers.elements.slice(0, cols),
      };
    }

    function addRow() {
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
    }

    function removeRow() {
      props.fields.rows.onChange([
        ...props.fields.rows.elements.slice(0, rows),
      ]);
    }

    const renderTableHeaders = () => {
      return props.fields.headers.elements.map((row, rowIndex) => (
        <th key={row.key} style={{ border: '1px solid black' }}>
          {row.element}
        </th>
      ));
    };

    function renderTableRows() {
      return props.fields.rows.elements.map((row, rowIndex) => (
        <tr key={rowIndex} style={{ border: '1px solid black' }}>
          {row.elements.map((column, colIndex) => (
            <td key={colIndex} style={{ border: '1px solid black' }}>
              {column.fields.content.element}
            </td>
          ))}
        </tr>
      ));
    }

    return (
      <>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <NotEditable>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <button onClick={() => setRows(rows + 1)}>Add a row</button>
            <button onClick={() => setRows(rows > 0 ? rows - 1 : rows)}>
              Remove a row
            </button>
            <button onClick={() => setCols(cols + 1)}>Add a column</button>
            <button onClick={() => setCols(cols > 0 ? cols - 1 : cols)}>
              Remove a column
            </button>
          </div>
        </NotEditable>
      </>
    );
  },
});
