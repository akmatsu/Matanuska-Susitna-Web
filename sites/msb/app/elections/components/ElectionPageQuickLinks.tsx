import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPageQuickLinksFragment = gql(`
  fragment ElectionPageQuickLinks on Election {
    candidates {
      ...DocumentLink
    }
    electionOfficialApplication {
      ...DocumentLink
    }
    absenteeVotingApplication {
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
      <DocumentLinkButton data={data.absenteeVotingApplication} />
      <DocumentLinkButton data={data.result?.document} />
    </div>
  );
}
