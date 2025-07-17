import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { formatDate } from '@/utils/datetimehHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const CandidateInfoFragment = gql(`
  fragment CandidateInfo on Election {
    candidates {
      ...DocumentLink
    }
    candidateFilingDeadline
  }
`);

export function CandidateInfo(props: {
  data?: FragmentType<typeof CandidateInfoFragment> | null;
}) {
  const data = getFragmentData(CandidateInfoFragment, props.data);
  const isAfterFilingDeadline = checkIsAfterFilingDeadline();

  function checkIsAfterFilingDeadline() {
    if (!data) return false;

    const now = new Date();
    const end = new Date(data.candidateFilingDeadline);

    return now > end;
  }

  return (
    <PageBodySection title="Candidate Information">
      <DocumentLinkButton data={data?.candidates}>
        View Candidates
      </DocumentLinkButton>
      <ProseWrapper>
        <p>
          {isAfterFilingDeadline
            ? `The candidate filing period ended on ${formatDate(
                data?.candidateFilingDeadline,
              )}.`
            : `The candidate filing period will end on ${formatDate(
                data?.candidateFilingDeadline,
              )}.`}
          {isAfterFilingDeadline && !data?.candidates && (
            <span>
              We are still processing the candidate applications and will update
              this page once they are available.
            </span>
          )}
        </p>
      </ProseWrapper>
    </PageBodySection>
  );
}
