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
    tableRows: fields.array(
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
    const [rowCount, setRowCount] = useState(
      props.fields.tableRows.elements.length || 0,
    );
    const [colCount, setColCount] = useState(
      props.fields.headers.elements.length || 2,
    );

    useEffect(() => {
      adjustTableRows();
    }, [rowCount]);

    useEffect(() => {
      adjustTableCols();
    }, [colCount]);

    function adjustTableRows() {
      const tableRows = props.fields.tableRows;
      if (tableRows.elements.length < rowCount) {
        addTableRow();
      }

      if (tableRows.elements.length > rowCount) {
        removeTableRow();
      }
    }

    function adjustTableCols() {
      const tooFewHeaders = props.fields.headers.elements.length < colCount;
      const tooManyHeaders = props.fields.headers.elements.length > colCount;
      const tooFewBodyCols = props.fields.tableRows.elements.some(
        (x) => x.elements.length < colCount,
      );
      const tooManyBodyCols = props.fields.tableRows.elements.some(
        (x) => x.elements.length > colCount,
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
        tableRows: props.fields.tableRows.elements.map((r) => ({
          key: r.key,
          value: [
            ...r.elements,
            ...Array.from({ length: colCount - r.elements.length }, () => ({
              key: undefined,
            })),
          ],
        })),
      };
    }

    function removeBodyCol() {
      return {
        tableRows: props.fields.tableRows.elements.map((r) => ({
          key: r.key,
          value: r.elements.slice(0, colCount),
        })),
      };
    }

    function addHeaderCol() {
      return {
        headers: [
          ...props.fields.headers.elements,
          ...Array.from(
            { length: colCount - props.fields.headers.elements.length },
            () => ({ key: undefined }),
          ),
        ],
      };
    }

    function removeHeaderCol() {
      return {
        headers: props.fields.headers.elements.slice(0, colCount),
      };
    }

    function addTableRow() {
      props.fields.tableRows.onChange([
        ...props.fields.tableRows.elements.map((x) => ({ key: x.key })), // Keep existing rowCount
        ...Array.from(
          { length: rowCount - props.fields.tableRows.elements.length },
          () => ({
            key: undefined,
            value: Array.from({ length: colCount }, () => ({ key: undefined })),
          }),
        ),
      ]);
    }

    function removeTableRow() {
      props.fields.tableRows.onChange([
        ...props.fields.tableRows.elements.slice(0, rowCount),
      ]);
    }

    const renderTableHeaders = () => {
      return props.fields.headers.elements.map((row) => (
        <th key={row.key} style={{ border: '1px solid black' }}>
          {row.element}
        </th>
      ));
    };

    function renderTableRows() {
      return props.fields.tableRows.elements.map((row) => (
        <tr key={row.key} style={{ border: '1px solid black' }}>
          {row.elements.map((column) => (
            <td key={column.key} style={{ border: '1px solid black' }}>
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
            <button onClick={() => setRowCount(rowCount + 1)}>Add a row</button>
            <button
              onClick={() =>
                setRowCount(rowCount > 0 ? rowCount - 1 : rowCount)
              }
            >
              Remove a row
            </button>
            <button onClick={() => setColCount(colCount + 1)}>
              Add a column
            </button>
            <button
              onClick={() =>
                setColCount(colCount > 0 ? colCount - 1 : colCount)
              }
            >
              Remove a column
            </button>
          </div>
        </NotEditable>
      </>
    );
  },
});
