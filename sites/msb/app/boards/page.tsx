import { PageContainer } from '@/components/PageContainer';
import { Card, CardBody, CardHeader, CardTitle, Hero } from '@matsugov/ui';
import { Metadata } from 'next';
import { PageBody } from '../[section]/[slug]/components/PageBody';
import { PageSideNavController } from '../[section]/[slug]/components/PageSideNavController';
import { PageSidebar } from '../[section]/[slug]/components';
import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { BoardsList } from './components/BoardsList';

export const metadata: Metadata = {
  title: 'MSB - Boards & Commissions',
  description:
    'The Matanuska-Susitna Borough (MSB) Boards, Commissions, and Community Councils',
};

export default async function BoardsPage() {
  const { GET_BOARDS_PAGE } = await import('@msb/js-sdk/getBoardsPage');
  const { data, errors, error } = await getClient().query({
    query: GET_BOARDS_PAGE,
    context: {
      fetchOptions: {
        next: {
          revalidate: 15,
        },
      },
    },
  });

  if (error) {
    console.error('Error fetching boards page data:', JSON.stringify(errors));
    throw error;
  }

  const page = data.boardPage;

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Hero image="https://d1159zutbdy4l.cloudfront.net/public/uploads/acc9dacd-8633-4156-a476-5a5a22b957beoptimized_images/1920x1079_optimized_image.jpg?position=56.08838002993175% 38.41491556945659%" />
      <PageContainer>
        <PageSideNavController rightSide={<PageSidebar page={page} />}>
          <PageBody
            title={page.title}
            body={page.body}
            description={page.description}
          />

          <div className="grid grid-cols-12 gap-2">
            <Card containerClassName="col-span-12 md:col-span-6">
              <CardHeader>
                <CardTitle>Requirements to Serve</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-disc list-inside">
                  <li>Be a resident of the Borough.</li>
                  <li>
                    Meet qualifications for specific board (if applicable).
                  </li>
                  <li>Attend mandatory training sessions.</li>
                </ul>
              </CardBody>
            </Card>
            <Card containerClassName="col-span-12 md:col-span-6">
              <CardHeader>
                <CardTitle>Requirements to Serve</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-disc list-inside">
                  <li>Be a resident of the Borough.</li>
                  <li>
                    Meet qualifications for specific board (if applicable).
                  </li>
                  <li>Attend mandatory training sessions.</li>
                </ul>
              </CardBody>
            </Card>
            <Card containerClassName="col-span-12 md:col-span-6">
              <CardHeader>
                <CardTitle>Requirements to Serve</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-disc list-inside">
                  <li>Be a resident of the Borough.</li>
                  <li>
                    Meet qualifications for specific board (if applicable).
                  </li>
                  <li>Attend mandatory training sessions.</li>
                </ul>
              </CardBody>
            </Card>
            <Card containerClassName="col-span-12 md:col-span-6">
              <CardHeader>
                <CardTitle>Requirements to Serve</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-disc list-inside">
                  <li>Be a resident of the Borough.</li>
                  <li>
                    Meet qualifications for specific board (if applicable).
                  </li>
                  <li>Attend mandatory training sessions.</li>
                </ul>
              </CardBody>
            </Card>
          </div>
          <BoardsList />
        </PageSideNavController>
      </PageContainer>
    </>
  );
}
