import { cn } from '@matsugov/ui/lib';

export const PropertyRow = ({
  label,
  value,
  isLast = false,
  className,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
  className?: string;
}) => (
  <tr
    className={cn(
      !isLast
        ? 'border-table-border border-b print:border print:border-black'
        : '',
      'print:border print:border-black',
      className,
    )}
  >
    <td className="bg-surface-dark border-table-border w-32 border-r px-1 font-bold text-white print:border print:border-black print:bg-blue-300 print:text-black">
      {label}
    </td>
    <td className="bg-surface px-1 print:border print:border-black">{value}</td>
  </tr>
);
