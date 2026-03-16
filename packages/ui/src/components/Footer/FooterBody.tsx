export function FooterBody(props: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-primary flex flex-col gap-8 p-4 text-white md:flex-row md:justify-center xl:gap-16">
      {props.children}
    </div>
  );
}
