import { MarkdownRenderer } from '@components/server/MarkdownRenderer';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const pageBodyFragment = gql(`
  fragment PageBody on BasePage {
    __typename
    title
    body
    description
  }
`);

const pageServiceBodyFragment = gql(`
  fragment PageServiceBody on BasePage {
    __typename
    title
    body
    description
  }
`);

export function PageBody(props: {
  noProse?: boolean;
  page?: FragmentType<typeof pageServiceBodyFragment> | null;
}) {
  const page = getFragmentData(pageServiceBodyFragment, props.page);
  console.log(page);
  if (!page?.body || !page?.description) {
    return null;
  }

  console.log(page);

  return (
    <div
      className={
        props.noProse
          ? ''
          : 'prose max-w-none prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary'
      }
    >
      <p className="text-bold capitalize text-base-dark! font-bold text-2xl not-prose">
        {page.__typename?.split(/(?=[A-Z])/).join(' ')}
      </p>
      <h1>{page.title}</h1>

      {page.body ? (
        <MarkdownRenderer>{page.body}</MarkdownRenderer>
      ) : page.description ? (
        <p>{page.description}</p>
      ) : undefined}
    </div>
  );
}
