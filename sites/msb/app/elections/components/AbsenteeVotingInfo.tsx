import { LinkButton } from '@/components/static/LinkButton';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';

export function AbsenteeVotingInfo(props: {}) {
  return (
    <PageBodySection title="Early/Absentee Voting Information">
      <ProseWrapper>
        <p>
          Any registered voter of the Borough may apply for a ballot to be
          mailed to them by submitting an Absentee By-Mail Ballot Application
          not later than seven days prior to Election Day.
        </p>
        <LinkButton
          href="/elections/early-and-absentee-voting-information"
          className="not-prose"
        >
          Learn more
        </LinkButton>
      </ProseWrapper>
    </PageBodySection>
  );
}
