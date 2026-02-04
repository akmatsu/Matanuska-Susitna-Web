import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from '@/components/static/Page/PageSection';
import { DropdownButton } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPageQuickLinksFragment = gql(`
  fragment ElectionPageQuickLinks on Election {
    candidates {
      ...DocumentLink
    }
    documents {
      id
      title
      file {
        url
      }
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

    propositionsCount
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
  ];

  return (
    <PageSection title="Quick Links">
      <div className="flex flex-col gap-2">
        {!!data.documents?.length &&
          data.documents.map((doc) => (
            <DocumentLinkButton data={doc} key={doc.id} color="primary" block />
          ))}
        <DocumentLinkButton data={data.candidates} color="primary" block />
        <DocumentLinkButton
          data={data.electionOfficialApplication}
          color="primary"
          block
        />
        <DocumentLinkButton
          data={data.absenteeVotingApplication}
          color="primary"
          block
        />

        <DocumentLinkButton
          data={data.result?.document}
          color="primary"
          block
        />
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
                buttonProps={{ color: 'primary', block: true }}
              />
            );
          } else {
            if (!doc.value) return null;
            return (
              <DocumentLinkButton
                data={doc.value}
                key={doc.value.id}
                color="primary"
                block
              />
            );
          }
        })}
        <LinkButton
          href="#early-absentee-voting-information"
          color="primary"
          block
        >
          Early and Absentee Voting Information
        </LinkButton>
        {!!data.propositionsCount && (
          <LinkButton href="#ballot-propositions" color="primary" block>
            Propositions
          </LinkButton>
        )}
      </div>
    </PageSection>
  );
}
