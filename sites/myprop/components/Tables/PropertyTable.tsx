export const PropertyTable = ({ children }: { children: React.ReactNode }) => (
  <table className="border-table-border w-full border print:border-collapse print:border-black">
    <tbody>{children}</tbody>
  </table>
);
