import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPageQuickLinksFragment = gql(`
  fragment ElectionPageQuickLinks on Election {
    candidates {
      ...DocumentLink
    }
    electionOfficialApplication {
      ...DocumentLink
    }
    
    result {
      document {
        ...DocumentLink
      }
    }
  }
`);

export function ElectionPageQuickLinks(props: {
  data?: FragmentType<typeof ElectionPageQuickLinksFragment> | null;
}) {
  const data = getFragmentData(ElectionPageQuickLinksFragment, props.data);
  if (!data) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      <DocumentLinkButton data={data.candidates} />
      <DocumentLinkButton data={data.electionOfficialApplication} />

      <LinkButton href="#early-absentee-voting-information">
        Early and Absentee Voting Information
      </LinkButton>
      <DocumentLinkButton data={data.result?.document} />
    </div>
  );
}
