import { MarkdownRenderer } from '@components/server/MarkdownRenderer';

export function PageBodyNoFrag(props: {
  noProse?: boolean;
  title: string;
  body?: string;
  description?: string;
}) {
  return (
    <div
      className={
        props.noProse
          ? ''
          : 'prose max-w-none prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary'
      }
    >
      <h1>{props.title}</h1>

      {props.body ? (
        <MarkdownRenderer>{props.body}</MarkdownRenderer>
      ) : props.description ? (
        <p>{props.description}</p>
      ) : undefined}
    </div>
  );
}
