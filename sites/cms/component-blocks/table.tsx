import React, { useEffect } from 'react';
import {
  component,
  fields,
  NotEditable,
} from '@keystone-6/fields-document/component-blocks';

export const table = component({
  preview: function MyTable(props) {
    // Determine the maximum number of columns across all rows
    const getMaxColumns = (rows: typeof props.fields.rows) => {
      let maxColumns = 1;
      for (const row of rows.elements) {
        if (row.elements.length > maxColumns) {
          maxColumns = row.elements.length;
        }
      }
      return maxColumns;
    };

    // Adjust rows to ensure all rows have the same number of columns
    const adjustRowsForMaxColumns = (
      rows: typeof props.fields.rows,
      maxColumns: number,
    ) => {
      if (rows.elements.some((x) => x.elements.length !== maxColumns)) {
        rows.onChange(
          rows.elements.map((element) => {
            return {
              key: element.key,
              value: [
                ...element.elements.map((x) => ({ key: x.key })), // Keep existing columns
                ...Array.from(
                  { length: maxColumns - element.elements.length }, // Add empty columns
                  () => ({
                    key: undefined, // Undefined key for new/empty columns
                  }),
                ),
              ],
            };
          }),
        );
      }
    };

    // Handle inserting a new column
    const handleInsertColumn = () => {
      props.fields.rows.onChange(
        props.fields.rows.elements.map((element) => {
          return {
            key: element.key,
            value: [
              ...element.elements.map((x) => ({ key: x.key })), // Keep existing columns
              { key: undefined }, // Add a new empty column
            ],
          };
        }),
      );
    };

    const handleRemoveColumn = () => {
      props.fields.rows.onChange();
    };

    // Handle inserting a new row
    const handleInsertRow = () => {
      props.fields.rows.onChange([
        ...props.fields.rows.elements.map((x) => ({ key: x.key })), // Keep existing rows
        { key: undefined }, // Add a new empty row
      ]);
    };

    // useEffect to adjust rows when component is mounted/updated
    useEffect(() => {
      const rows = props.fields.rows;
      const maxColumns = getMaxColumns(rows);
      adjustRowsForMaxColumns(rows, maxColumns);
    }, [props.fields.rows]);

    // Render table rows and cells
    const renderTableRows = () => {
      return props.fields.rows.elements.map((row, rowIndex) => (
        <tr key={rowIndex} style={{ border: '1px solid black' }}>
          {row.elements.map((column, colIndex) => (
            <td key={colIndex} style={{ border: '1px solid black' }}>
              {column.fields.content.element}
            </td>
          ))}
          {rowIndex === 0 && (
            <NotEditable>
              <button onClick={handleInsertColumn}>+</button>
              <button onClick={handleRemoveColumn}>-</button>
            </NotEditable>
          )}
        </tr>
      ));
    };

    return (
      <div>
        <table style={{ width: '100%' }}>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <NotEditable>
          <button onClick={handleInsertRow}>+</button>
        </NotEditable>
      </div>
    );
  },
  label: 'Table',
  chromeless: true,
  schema: {
    rows: fields.array(
      fields.array(
        fields.object({
          content: fields.child({ kind: 'block', placeholder: '' }),
        }),
      ),
    ),
    headers: fields.object({
      row: fields.checkbox({ label: 'Header Row' }),
      column: fields.checkbox({ label: 'Header Column' }),
    }),
  },
});
