export const LabelCell = ({
  children,
  noWidth = false,
}: {
  children: React.ReactNode;
  noWidth?: boolean;
}) => (
  <td
    className={
      noWidth
        ? 'bg-surface-dark border-table-border border-r px-1 text-white'
        : 'bg-surface-dark border-table-border w-32 border-r px-1 text-white'
    }
  >
    {children}
  </td>
);
