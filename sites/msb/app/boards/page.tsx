import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { Hero } from '@matsugov/ui/Hero';
import * as next from 'next';
import { PageBody } from '@/components/static/Page/PageBody';
import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { BoardsList } from './components/BoardsList';
import { GET_BOARDS_PAGE } from '@msb/js-sdk';
import Link from 'next/link';

export const metadata: next.Metadata = {
  title: 'MSB - Boards & Commissions',
  description:
    'The Matanuska-Susitna Borough (MSB) Boards, Commissions, and Community Councils',
};

export default async function BoardsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
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
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-8 col-span-12">
        <PageBody
          title={page.title}
          body={page.body}
          description={page.description}
        />

        <div className="grid grid-cols-12 gap-2">
          <Card
            containerClassName="col-span-12 md:col-span-6"
            className="h-full"
          >
            <CardHeader>
              <div className="max-w-fit">
                <CardTitle>Requirements to Serve</CardTitle>
                <div className="max-w-full bg-secondary h-1 mt-1.5"></div>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="list-disc list-inside">
                <li>Be a resident of the Borough.</li>
                <li>Meet qualifications for specific board (if applicable).</li>
                <li>Attend mandatory training sessions.</li>
              </ul>
            </CardBody>
          </Card>
          <Card
            containerClassName="col-span-12 md:col-span-6"
            className="h-full"
          >
            <CardHeader>
              <div className="max-w-fit">
                <CardTitle>Documents & Resources</CardTitle>
                <div className="max-w-full bg-secondary h-1 mt-1.5"></div>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="list-disc list-inside">
                {page.documents?.map((doc) => (
                  <li key={doc.id} className="list-disc list-inside">
                    <Link
                      href={doc.file?.url || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card
            containerClassName="col-span-12 md:col-span-6"
            className="h-full"
          >
            <CardHeader>
              <div className="max-w-fit">
                <CardTitle>How to Apply</CardTitle>
                <div className="max-w-full bg-secondary h-1 mt-1.5"></div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                To apply for a board or commission, please fill out and submit
                the Boards & Commissions Application. Applications are reviewed
                by the Borough Clerks Office.
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <Link href={page.applicationForm?.file?.url || ''}>
                    {page.applicationForm?.title}
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card
            containerClassName="col-span-12 md:col-span-6"
            className="h-full"
          >
            <CardHeader>
              <div className="max-w-fit">
                <CardTitle>Requirements to Serve</CardTitle>
                <div className="max-w-full bg-secondary h-1 mt-1.5"></div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                View the most recent Vacancy report to see the available seats
                on the boards and commissions
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <Link href={page.vacancyReport?.file?.url || ''}>
                    {page.vacancyReport?.title}
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <BoardsList searchParams={params} />
      </div>
    </>
  );
}
