import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { DropdownButton } from '@matsugov/ui';
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

    electionBrochure {
      id
      title
      file {
        url
      }
      ...DocumentLink
    }

    electionBallots {
      id
      title
      file {
        url
      }
      ...DocumentLink
    }

    propositions {
      id
      title
      file {
        url
      }
      ...DocumentLink
    }
  }
`);

export function ElectionPageQuickLinks(props: {
  data?: FragmentType<typeof ElectionPageQuickLinksFragment> | null;
}) {
  const data = getFragmentData(ElectionPageQuickLinksFragment, props.data);
  if (!data) return null;

  const documents = [
    {
      label: 'Election Brochure',
      value: data.electionBrochure,
    },
    {
      label: 'Sample Election Ballots',
      value: data.electionBallots,
    },
    {
      label: 'Propositions',
      value: data.propositions,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      <DocumentLinkButton data={data.candidates} color="primary" />
      <DocumentLinkButton
        data={data.electionOfficialApplication}
        color="primary"
      />

      <DocumentLinkButton data={data.result?.document} color="primary" />
      {documents.map((doc, index) => {
        if (!doc.value) return null;
        if (Array.isArray(doc.value)) {
          if (doc.value.length === 0) return null;
          return (
            <DropdownButton
              key={index}
              label={doc.label}
              items={doc.value.map((item) => ({
                label: item.title || '',
                value: item.id,
                href: item.file?.url,
              }))}
              buttonProps={{ color: 'primary' }}
            />
          );
        } else {
          if (!doc.value) return null;
          return (
            <DocumentLinkButton
              data={doc.value}
              key={doc.value.id}
              color="primary"
            />
          );
        }
      })}
      <LinkButton href="#early-absentee-voting-information" color="primary">
        Early and Absentee Voting Information
      </LinkButton>
    </div>
  );
}
