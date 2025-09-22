import clsx from 'clsx';

export function PageSection({
  title,
  children,
  className,
  margins = 'none',
  headerSize = 'sm',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  margins?: 'none' | 'sm' | 'md' | 'lg';
  headerSize?: 'sm' | 'lg';
}) {
  return (
    <section
      className={clsx(
        {
          'not-last:mb-16 not-first:mt-16': margins === 'md',
          'not-last:mb-8 not-first:mt-8': margins === 'sm',
          'not-last:mb-24 not-first:mt-24': margins === 'lg',
          'not-last:mb-0 not-first:mt-0': margins === 'none',
        },
        className,
      )}
    >
      {title && (
        <h2
          className={clsx('mb-4 font-bold', {
            'text-3xl': headerSize === 'lg',
            'text-xl': headerSize === 'sm',
          })}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
