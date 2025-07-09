import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPageHeaderFragment = gql(`
  fragment ElectionPageHeader on ElectionsPage {
    howElectionsWork
    title
    description
  }`);

export function ElectionPageHeader(props: {
  data?: FragmentType<typeof ElectionPageHeaderFragment> | null;
}) {
  const data = getFragmentData(ElectionPageHeaderFragment, props.data);
  if (!data) return null;

  return (
    <ProseWrapper className="text-center">
      <h1>{data.title}</h1>
      <p className="italic">{data.description}</p>
      {data.howElectionsWork && (
        <details className="bg-base-lightest rounded-lg py-2 px-4">
          <summary className="text-bold capitalize font-bold cursor-pointer">
            Learn how elections work locally
          </summary>
          <div className="flex justify-center">
            <div className="max-w-3xl">
              <MarkdownRenderer>{data.howElectionsWork}</MarkdownRenderer>
            </div>
          </div>
        </details>
      )}
    </ProseWrapper>
  );
}
