export function FooterSection({
  linkAs = 'a',
  ...props
}: {
  title: string;
  // items: {
  //   href?: string;
  //   label: string;
  //   action?: () => void;
  //   condition?: boolean;
  // }[];
  children?: React.ReactNode;
  linkAs?: React.ElementType;
  condition?: boolean;
}) {
  return (
    <section className="text-center text-sm md:text-left">
      <h4 className="text-lg font-semibold">{props.title}</h4>
      <ul className="flex flex-col items-center gap-2 md:items-start">
        {props.children}
        {/* {props.items.map((item) =>
          item.condition === undefined || item.condition ? (
            <li key={item.label}>
              {item.href ? (
                <FooterLink href={item.href} as={linkAs}>
                  {item.label}
                </FooterLink>
              ) : (
                <FooterButton onClick={item.action}>{item.label}</FooterButton>
              )}
            </li>
          ) : null,
        )} */}
      </ul>
    </section>
  );
}
