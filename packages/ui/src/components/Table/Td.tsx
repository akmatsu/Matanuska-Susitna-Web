export function Td({
  children,
  colSpan,
}: {
  children: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <td className="border border-base-lighter px-4 py-2" colSpan={colSpan}>
      {children}
    </td>
  );
}
