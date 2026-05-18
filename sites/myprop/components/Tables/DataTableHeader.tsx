import React from 'react';

export const DataTableHeader = ({
  headers,
}: {
  headers: Array<{ label: React.ReactNode; right?: boolean }>;
}) => (
  <thead>
    <tr className="bg-surface-dark border-table-border border-b text-white print:border print:border-black print:text-black">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={
            idx === headers.length - 1
              ? 'px-1'
              : header.right
                ? 'border-table-border border-r px-1 text-right print:border print:border-black print:text-black'
                : 'border-table-border border-r px-1 text-left print:border print:border-black print:text-black'
          }
        >
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);
