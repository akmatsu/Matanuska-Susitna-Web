import { LinkButton } from '@/components/static/LinkButton';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { formatDate } from '@/utils/datetimehHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const CandidateInfoFragment = gql(`
  fragment CandidateInfo on Election {
    candidates {
      title
      file {
        url
      }
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
      {data?.candidates?.file?.url && (
        <LinkButton href={data?.candidates.file?.url} className="mb-4">
          View Candidates
        </LinkButton>
      )}
      <ProseWrapper>
        <p>
          The candidate filing period ended on{' '}
          {formatDate(data?.candidateFilingDeadline)}.{' '}
          {!data?.candidates?.file?.url && (
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
