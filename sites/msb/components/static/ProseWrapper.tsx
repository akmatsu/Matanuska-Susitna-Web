import clsx from 'clsx';

export function ProseWrapper(props: {
  children: React.ReactNode;
  noProse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        {
          'prose max-w-none prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary prose-blockquote:py-4 prose-blockquote:px-4':
            !props.noProse,
        },
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
