export function FooterSection(props: {
  title: string;
  children?: React.ReactNode;
  condition?: boolean;
}) {
  return (
    <section className="text-center text-sm md:text-left">
      <p className="text-lg font-semibold">{props.title}</p>
      <ul className="flex flex-col items-center gap-2 md:items-start">
        {props.children}
      </ul>
    </section>
  );
}
