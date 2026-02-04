import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { PageSection } from '@/components/static/Page';
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
    <PageSection>
      <ProseWrapper>
        <h1>{data.title}</h1>
        <p className="italic mb-0">{data.description}</p>

        <MarkdownRenderer>{data.howElectionsWork}</MarkdownRenderer>
      </ProseWrapper>
    </PageSection>
  );
}
