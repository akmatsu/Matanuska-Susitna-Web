export function Th(props: { children: React.ReactNode }) {
  return (
    <th className="border border-base-light py-1 px-4 text-left">
      {props.children}
    </th>
  );
}
