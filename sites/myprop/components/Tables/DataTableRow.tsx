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
        ? 'border-table-border bg-surface border-b print:border print:border-black'
        : 'bg-surface print:border print:border-black'
    }
  >
    {cells.map((cell, idx) => {
      const isLastCell = idx === cells.length - 1;
      const className = [
        isLastCell ? 'px-1' : 'border-r border-table-border px-1',
        cell.right && (isLastCell ? 'text-right' : 'text-right'),
        'print:border print:border-black',
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
