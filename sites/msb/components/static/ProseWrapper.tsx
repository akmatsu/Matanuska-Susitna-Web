import clsx from 'clsx';

export function ProseWrapper(props: {
  children: React.ReactNode;
  noProse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        !props.noProse && [
          // base styles
          'prose max-w-none text-ink',

          // Links
          'prose-a:text-primary',

          // Blockquote styles
          'prose-blockquote:py-4 prose-blockquote:px-4',

          // table styles
          'prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-table:border prose-table:border-base-darkest',
          'prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2',
          'prose-td:px-2 prose-td:border prose-td:border-base-darkest',
        ],

        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
