import { LinkButton } from '@/components/static/LinkButton';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPageQuickLinksFragment = gql(`
  fragment ElectionPageQuickLinks on Election {
    candidates {
      ...ElectionDocumentLink
    }
    electionOfficialApplication {
      ...ElectionDocumentLink
    }
    absenteeVotingApplication {
      ...ElectionDocumentLink
    }
    result {
      document {
        ...ElectionDocumentLink
      }
    }
  }
`);

const ElectionDocumentLinkFragment = gql(`
  fragment ElectionDocumentLink on Document {
    title
    file {
      url
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
      <ElectionDocumentLink data={data.candidates} />
      <ElectionDocumentLink data={data.electionOfficialApplication} />
      <ElectionDocumentLink data={data.absenteeVotingApplication} />
      <ElectionDocumentLink data={data.result?.document} />
    </div>
  );
}

export function ElectionDocumentLink(props: {
  data?: FragmentType<typeof ElectionDocumentLinkFragment> | null;
}) {
  const data = getFragmentData(ElectionDocumentLinkFragment, props.data);
  if (!data?.file?.url) return null;

  return (
    <LinkButton href={data.file.url} target="_blank">
      {data.title}
    </LinkButton>
  );
}
