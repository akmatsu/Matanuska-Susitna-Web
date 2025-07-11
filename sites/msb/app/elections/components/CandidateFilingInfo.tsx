import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { CodeLink } from '@/components/static/CodeLink';
import { Link } from '@/components/static/Link';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import {
  formatDate,
  formatDateDayMonthYear,
  getDayOfWeekFromDate,
} from '@/utils/datetimehHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const CandidateFilingInfoFragment = gql(`
  fragment CandidateFilingInfo on Election {
    title
    candidates {
      title,
      file {
        url
      }
    }
    electionDate
    officesToBeFilled
    candidateFilingStartDate
    candidateFilingDeadline
    candidateFilingDocuments {
      title
      file {
        url
      }
    }
  }
`);

export function CandidateFilingInfo(props: {
  data?: FragmentType<typeof CandidateFilingInfoFragment> | null;
}) {
  const data = getFragmentData(CandidateFilingInfoFragment, props.data);
  const isWithinFilingPeriod = checkIsWithinFilingPeriod();

  function checkIsWithinFilingPeriod() {
    if (!data) return false;

    const now = new Date();
    const end = new Date(data.candidateFilingDeadline);

    return now <= end;
  }

  if (!isWithinFilingPeriod || !data) {
    return null;
  }

  return (
    <PageBodySection title="Candidate Filing Information">
      <ProseWrapper>
        <p>
          The candidate filing period for {data?.title} starts on{' '}
          <span className="font-semibold">
            {formatDate(data?.candidateFilingStartDate)}
          </span>{' '}
          and ends on{' '}
          <span className="font-semibold">
            {formatDate(data?.candidateFilingDeadline)}
          </span>
        </p>
        <ul>
          {data?.candidateFilingDocuments?.map((doc) => {
            if (!doc.file?.url) return null;
            return (
              <li key={doc.title}>
                <Link href={doc.file.url}>{doc.title}</Link>
              </li>
            );
          })}
        </ul>
        <blockquote className="bg-green-100 border-l-green-500 rounded not-italic">
          <h3 className="mt-0">Candidate Qualifications</h3>
          <ul>
            <li>
              <span className="font-semibold">Candidates for Assembly</span>{' '}
              seats shall reside in the Borough and in the Assembly District for
              which they file for one year immediately prior to the election and
              meets the requirements of{' '}
              <CodeLink code="2.12.030">MSB 2.12.030</CodeLink> and{' '}
              <CodeLink code="25.15.010">25.15.010</CodeLink>
            </li>

            <li>
              <span className="font-semibold">
                Candidates for the School Board
              </span>{' '}
              seats shall reside in the Borough and within the Assembly District
              boundaries for which they file (
              <CodeLink code="19.04">MSB 19.04</CodeLink>
              ).
            </li>

            <li>
              Candidates shall provide proof that they are eligible or shall be
              eligible by the date of the election, to be recognized as a
              candidate for any election and meet the requirements of{' '}
              <CodeLink code="25.15.010">MSB 25.15.010</CodeLink>.
            </li>
          </ul>
        </blockquote>
        <p>
          The Matanuska-Susitna Borough will hold a regular election on{' '}
          <span className="font-semibold">
            {getDayOfWeekFromDate(data.electionDate)},{' '}
            {formatDateDayMonthYear(data.electionDate)}
          </span>
          .
        </p>
        The following offices will be filled in this election:
        <MarkdownRenderer>{data.officesToBeFilled}</MarkdownRenderer>
      </ProseWrapper>
    </PageBodySection>
  );
}
