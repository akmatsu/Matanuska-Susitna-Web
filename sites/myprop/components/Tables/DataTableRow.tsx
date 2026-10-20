export const DataTableRow = ({
  cells,
  isLast = false,
}: {
  cells: Array<{ value: React.ReactNode; right?: boolean; bold?: boolean }>;
  isLast?: boolean;
}) => (
  <tr
    className={
      !isLast
        ? 'border-table-border bg-surface print:border-table-border-print border-b'
        : 'bg-surface print:border-table-border-print print:border-b'
    }
  >
    {cells.map((cell, idx) => {
      const isLastCell = idx === cells.length - 1;
      const className = [
        isLastCell
          ? 'px-1'
          : 'border-r border-table-border px-1 print:border-r-0',
        cell.right && (isLastCell ? 'text-right' : 'text-right'),
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <td key={`${idx}-${cell.value}`} className={className}>
          {cell.value}
        </td>
      );
    })}
  </tr>
);
