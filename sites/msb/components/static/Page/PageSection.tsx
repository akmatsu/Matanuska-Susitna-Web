export function PageSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
    </section>
  );
}
