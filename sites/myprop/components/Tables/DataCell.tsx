export const DataCell = ({
  children,
  isLast = false,
  nowrap = false,
}: {
  children: React.ReactNode;
  isLast?: boolean;
  nowrap?: boolean;
}) => {
  const baseClass = isLast
    ? 'px-1 bg-surface'
    : 'border-r border-table-border px-1 bg-surface';
  const noWrapClass = nowrap ? ' whitespace-nowrap' : '';
  return <td className={baseClass + noWrapClass}>{children}</td>;
};
