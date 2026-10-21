import { cn } from '@matsugov/ui/lib';
import { DataTableHeader } from './DataTableHeader';

export const DataTable = ({
  headers,
  className,
  children,
}: {
  headers: Array<{ label: React.ReactNode; right?: boolean }>;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('overflow-x-auto', className)}>
    <table className="border-table-border print:border-table-border-print w-full border print:border-collapse">
      <DataTableHeader headers={headers} />
      <tbody>{children}</tbody>
    </table>
  </div>
);
