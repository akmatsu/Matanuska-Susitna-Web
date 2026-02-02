import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageSection } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { PhoneLink } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const GetPropositions = gql(`
  fragment Election_BallotPropositions on Query {
    elections(take: 1, orderBy: {
      electionDate: desc
    }) {
      propositions(orderBy: {order: asc}) {
        id
        title
        document {
          ...DocumentLink
        }
        description
      }
    }
    electionsPage {
      boroughElectionContact {
        name
        phone
      }
    }
  }
`);

export function BallotPropositions(props: {
  data: FragmentType<typeof GetPropositions>;
}) {
  const data = getFragmentData(GetPropositions, props.data);
  const propositions = data.elections?.[0]?.propositions;

  if (!propositions?.length) return null;

  return (
    <PageSection title="Ballot Propositions" headerSize="lg">
      <ProseWrapper>
        {!!propositions?.length && (
          <blockquote className="border-l-4 border-green-500 bg-green-100 not-italic">
            The Legislation placing propositions on the ballot is available to
            download below. Alternatively you can call the{' '}
            {data.electionsPage?.boroughElectionContact?.name} at{' '}
            <PhoneLink
              phoneNumber={
                data.electionsPage?.boroughElectionContact?.phone || ''
              }
            />{' '}
            for more information. A copy of the ordinances and resolution will
            be available at all voting locations.
          </blockquote>
        )}
        {propositions?.map((prop) => (
          <section key={prop.id}>
            <h3>{prop.title}</h3>
            <div className="flex flex-col-reverse md:grid grid-cols-5 md:gap-6">
              <div className="col-span-5 md:col-span-3">
                <p>{prop.description}</p>
              </div>
              <div className="md:block md:col-span-2">
                <DocumentLinkButton
                  data={prop.document}
                  className="not-prose md:w-full"
                  color="primary"
                />
              </div>
            </div>
          </section>
        ))}
      </ProseWrapper>
    </PageSection>
  );
}
