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
    <table className="border-table-border w-full border print:border-collapse print:border-black">
      <DataTableHeader headers={headers} />
      <tbody>{children}</tbody>
    </table>
  </div>
);
