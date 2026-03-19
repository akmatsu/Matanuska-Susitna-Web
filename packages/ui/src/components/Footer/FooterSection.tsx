export function FooterSection(props: {
  title: string;
  children?: React.ReactNode;
  condition?: boolean;
}) {
  return (
    <section className="text-center text-sm md:text-left">
      <h4 className="text-lg font-semibold">{props.title}</h4>
      <ul className="flex flex-col items-center gap-2 md:items-start">
        {props.children}
      </ul>
    </section>
  );
}
