export const DataTableHeader = ({
  headers,
}: {
  headers: Array<{ label: string; right?: boolean }>;
}) => (
  <thead>
    <tr className="bg-surface-dark border-table-border border-b font-normal text-white">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={
            idx === headers.length - 1
              ? 'px-1'
              : header.right
                ? 'border-table-border border-r px-1 text-right font-normal'
                : 'border-table-border border-r px-1 text-left font-normal'
          }
        >
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);
