import { DataTableHeader } from './DataTableHeader';

export const DataTable = ({
  headers,
  children,
}: {
  headers: Array<{ label: React.ReactNode; right?: boolean }>;
  children: React.ReactNode;
}) => (
  <div className="overflow-x-auto">
    <table className="border-table-border w-full border">
      <DataTableHeader headers={headers} />
      <tbody>{children}</tbody>
    </table>
  </div>
);
