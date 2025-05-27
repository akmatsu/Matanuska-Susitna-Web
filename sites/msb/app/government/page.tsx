import { LinkButton } from '@/components/static/LinkButton';
import { PageBody, PageContainer } from '@/components/static/Page';
import { Hero } from '@matsugov/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MSB - Government',
  description:
    'Learn about the Matanuska-Susitna Borough government structure, including the roles of the Mayor, Assembly Members, and key administrative positions.',
};

export default async function GovernmentPage() {
  return (
    <>
      <Hero image="https://d1159zutbdy4l.cloudfront.net/public/uploads/f9b79905-37f8-4f75-8d7a-7d51826f87ca/boroughfalljumbo.jpg" />
      <PageContainer>
        <div className="grid grid-cols-12 gap-8">
          <div className="cols-12 md:col-span-8">
            <PageBody
              title="Government"
              body={`The Matanuska-Susitna Borough government is composed of a Mayor and seven Assembly Members, each representing one of the Borough's seven districts. Assembly Members are elected by voters within their respective districts, while the Mayor is elected at large by all Borough residents.\n\nThe Assembly serves as the Borough's legislative body. It sets policy, adopts the annual budget, enacts ordinances, and appoints the Borough Manager, Borough Clerk, and Borough Attorney.\n\nThe Borough Manager is the chief administrative officer responsible for overseeing daily operations, supervising departments, and implementing policies established by the Assembly. The Borough Attorney serves as the legal advisor to the Assembly and administration, drafts ordinances, reviews contracts, and represents the Borough in legal proceedings. The Borough Clerk manages official records, publishes meeting agendas and minutes, administers Borough elections, and provides administrative support to the Assembly.`}
            />
          </div>
          <aside className="col-span-12 md:col-span-4">
            <div className="flex flex-col gap-4">
              <LinkButton href="/boards" block>
                View Boards & Commissions
              </LinkButton>
              <LinkButton
                href="https://matanuska.legistar.com/Legislation.aspx"
                target="_blank"
                rel="noopener noreferrer"
                block
              >
                View Legislation
              </LinkButton>
            </div>
          </aside>
        </div>
      </PageContainer>
    </>
  );
}
