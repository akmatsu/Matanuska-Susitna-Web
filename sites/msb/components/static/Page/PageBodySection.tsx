import clsx from 'clsx';
import slugify from 'voca/slugify';

export function PageBodySection({
  title,
  children,
  noMargins,
}: {
  title?: string;
  children: React.ReactNode;
  noMargins?: boolean;
}) {
  return (
    <section
      className={clsx({
        'not-last:mb-32 not-first:mt-32': !noMargins,
      })}
    >
      {title && (
        <h2 className="text-3xl font-bold mb-4" id={slugify(title)}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
