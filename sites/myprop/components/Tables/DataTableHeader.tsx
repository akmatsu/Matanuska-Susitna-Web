import React from 'react';

export const DataTableHeader = ({
  headers,
}: {
  headers: Array<{ label: React.ReactNode; right?: boolean }>;
}) => (
  <thead>
    <tr className="bg-surface-dark border-table-border print:border-table-border-print border-b text-white print:bg-blue-300 print:text-black">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={
            idx === headers.length - 1
              ? 'px-1'
              : header.right
                ? 'border-table-border border-r px-1 text-right print:border-r-0 print:bg-blue-300 print:text-black'
                : 'border-table-border border-r px-1 text-left print:border-r-0 print:bg-blue-300 print:text-black'
          }
        >
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);
