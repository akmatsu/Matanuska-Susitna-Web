import { cn } from '@matsugov/ui/lib';

export function CardHeading({
  level = 2,
  children,
  className,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Tag className={cn('text-lg font-semibold sm:text-xl', className)}>
      {children}
    </Tag>
  );
}
