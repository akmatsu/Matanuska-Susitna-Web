export function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="not-odd:bg-neutral-100">{children}</tr>;
}
