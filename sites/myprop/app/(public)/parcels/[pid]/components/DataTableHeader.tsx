export const DataTableHeader = ({
  headers,
}: {
  headers: Array<{ label: string; right?: boolean }>;
}) => (
  <thead>
    <tr className="bg-surface-dark border-table-border border-b text-white">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={
            idx === headers.length - 1
              ? 'px-1 text-right font-bold'
              : header.right
                ? 'border-table-border border-r px-1 text-right font-bold'
                : 'border-table-border border-r px-1 text-left font-bold'
          }
        >
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);
