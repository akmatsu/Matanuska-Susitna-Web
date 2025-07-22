import { Table } from './Table';
import { Td } from './Td';
import { Th } from './Th';
import { THead } from './THead';
import { Thr } from './Thr';
import { Tr } from './Tr';

type Column<
  T extends object,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
> = {
  key: K;
  label: string;
  cell?: (value: T[K], row: T) => React.ReactNode;
};

export type DataTableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  noDataMessage?: string;
};

export function DataTable<T extends object>(props: DataTableProps<T>) {
  return (
    <Table>
      {props.columns && (
        <THead>
          <Thr>
            {props.columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Thr>
        </THead>
      )}
      <tbody>
        {props.data.length ? (
          props.data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {props.columns.map((col) => (
                <Td key={rowIndex + col.key}>
                  {col.cell
                    ? col.cell(row[col.key], row)
                    : String(row[col.key])}
                </Td>
              ))}
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={props.columns.length}>
              <p className="text-center text-gray-500">
                {props.noDataMessage || 'No data available.'}
              </p>
            </Td>
          </Tr>
        )}
      </tbody>
    </Table>
  );
}
