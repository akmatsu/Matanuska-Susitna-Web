export const PropertyTable = ({ children }: { children: React.ReactNode }) => (
  <table className="border-table-border print:border-table-border-print w-full border print:border-collapse">
    <tbody>{children}</tbody>
  </table>
);
