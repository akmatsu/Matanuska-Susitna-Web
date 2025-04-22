import { MarkdownRenderer } from './MarkdownRenderer';

export function PageBody(props: {
  title: string;
  noProse?: boolean;
  body?: string | null;
  description?: string | null;
  pageType?: string | null;
}) {
  return (
    <div
      className={
        props.noProse
          ? ''
          : 'prose prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary'
      }
    >
      <p className="text-bold capitalize !text-base-dark font-bold text-2xl not-prose">
        {props.pageType?.split(/(?=[A-Z])/).join(' ')}
      </p>
      <h1>{props.title}</h1>

      {props.body ? (
        <MarkdownRenderer>{props.body}</MarkdownRenderer>
      ) : props.description ? (
        <p>{props.description}</p>
      ) : undefined}
    </div>
  );
}
