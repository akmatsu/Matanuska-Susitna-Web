export const PropertyRow = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
}) => (
  <tr className={!isLast ? 'border-table-border border-b' : ''}>
    <td className="bg-surface-dark border-table-border w-32 border-r px-1 text-white">
      {label}
    </td>
    <td className="bg-surface px-1">{value}</td>
  </tr>
);
