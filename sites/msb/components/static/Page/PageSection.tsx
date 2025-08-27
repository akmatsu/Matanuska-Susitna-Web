import clsx from 'clsx';

export function PageSection({
  title,
  children,
  noMargins,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  noMargins?: boolean;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        {
          'not-last:mb-16 not-first:mt-16': !noMargins,
        },
        className,
      )}
    >
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </section>
  );
}
