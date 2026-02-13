export function HeaderNav(props: {
  /** Navigation items, this should be a list of <li> tags with link tags inside */
  children?: React.ReactNode;
}) {
  return (
    <nav className="hidden items-center gap-4 lg:flex">
      <ul className="flex items-center gap-4">{props.children}</ul>
    </nav>
  );
}
