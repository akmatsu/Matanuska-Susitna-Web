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
          'prose text-ink max-w-none leading-normal',

          // Links
          'prose-a:text-primary',

          // Blockquote styles
          'prose-blockquote:py-4 prose-blockquote:px-4',

          // table styles
          'prose-table:table-auto prose-table:w-full prose-th:bg-msb-base-lighter prose-table:border prose-table:border-msb-base-darkest',
          'prose-th:border prose-th:border-msb-base-darkest prose-th:font-bold prose-th:px-2',
          'prose-td:px-2 prose-td:border prose-td:border-msb-base-darkest',
        ],

        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
