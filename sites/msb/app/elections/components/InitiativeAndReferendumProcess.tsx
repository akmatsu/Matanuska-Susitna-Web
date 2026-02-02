import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageSection } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const GetData = gql(`
  fragment GetInitiativeAndReferendumProcess on Query {
    electionsPage {
      referendumProcessDocument {
        ...DocumentLink
      }
    }
  }
`);

export function InitiativeAndReferendumProcess(props: {
  data: FragmentType<typeof GetData>;
}) {
  const data = getFragmentData(GetData, props.data);
  if (!data?.electionsPage?.referendumProcessDocument) return null;

  return (
    <PageSection title="Initiative/Referendum Process" headerSize="lg">
      <ProseWrapper>
        <div className="flex flex-col-reverse md:grid grid-cols-5 md:gap-6">
          <div className="col-span-5 md:col-span-3">
            <p>
              Are you interested in understanding how the initiative/referendum
              process works? See our fact sheet for more information.
            </p>
          </div>
          <div className="md:block md:col-span-2">
            <DocumentLinkButton
              data={data.electionsPage.referendumProcessDocument}
              className="not-prose md:w-full"
              color="primary"
            />
          </div>
        </div>
      </ProseWrapper>
    </PageSection>
  );
}
