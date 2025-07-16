import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { Hero } from '@matsugov/ui/Hero';
import * as next from 'next';
import { PageBody } from '@/components/static/Page/PageBody';
import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import { BoardsList } from './components/BoardsList';
import { gql } from '@msb/js-sdk/gql';
import { BoardDocuments } from '@/components/static/Page/BoardDocuments';
import Link from 'next/link';
import { CodeLink } from '@/components/static/CodeLink';
import { PhoneLink } from '@/components/static/PhoneLink';
import { DocumentLink } from '@/components/static/DocumentLink';

const getBoardsPage = gql(`
  query GetBoardsPage {
    boardPage {
      ...PageBody
      ...HeroImage
      vacancyReport {
        ...DocumentLink
      }
      documents {
        ...BoardDocumentList
      }
      applicationForm {
        ...DocumentLink
      }

      contacts {
        ...ContactFields
      }

      actions {
        ...ActionList
      }
      ParliTrainingLink{ 
        label
        url {
          title
          url
        }
      }
    }
  }
`);

export const metadata: next.Metadata = {
  title: 'MSB - Boards & Commissions',
  description:
    'The Matanuska-Susitna Borough (MSB) Boards, Commissions, and Community Councils',
};

export default async function BoardsPage() {
  const { data, errors, error } = await getClient().query({
    query: getBoardsPage,
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
        <PageBody page={page} hideType />

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
              <p className="mb-4">
                Borough Boards, commissions, and committees are governed by{' '}
                <CodeLink code="4">MSB Title 4</CodeLink>, unless otherwise
                provided by ordinance. Each board member shall be a registered
                voter of the Borough, unless otherwise established in board
                code. If you are applying for a position limited to a specific
                geographic area, you must also be a resident of that area.
              </p>
              {page.ParliTrainingLink?.url?.url && (
                <ul className="list-disc list-inside">
                  <li>
                    <Link
                      href={page.ParliTrainingLink.url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {page.ParliTrainingLink.label ||
                        page.ParliTrainingLink.url.title}
                    </Link>
                  </li>
                </ul>
              )}
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
              <BoardDocuments documents={page.documents} />
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
                the Boards & Commissions Application. Completed applications can
                be emailed to{' '}
                <Link href="mailto:jamie.jokhy@matsugov.us">
                  jamie.jokhy@matsugov.us
                </Link>
                , delivered or mail to the Borough Clerk&apos;s Office, 350 E.
                Dahlia Ave, Palmer AK, 99645, or Faxed to 907-861-7845.
              </p>
              {page.applicationForm && (
                <ul className="list-disc list-inside">
                  <li>
                    <DocumentLink data={page.applicationForm} />
                  </li>
                </ul>
              )}
            </CardBody>
          </Card>
          <Card
            containerClassName="col-span-12 md:col-span-6"
            className="h-full"
          >
            <CardHeader>
              <div className="max-w-fit">
                <CardTitle>Vacancy Report</CardTitle>
                <div className="max-w-full bg-secondary h-1 mt-1.5"></div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                This report is pending Assembly confirmation. Please contact the
                Borough Clerk&apos;s office for additional information regarding
                the vacancy report. If you have questions about the application
                process, please call the Borough Clerk&apos;s office at{' '}
                <PhoneLink phoneNumber="9078618675" />. Thank you for your
                interest in serving.
              </p>
              {page.vacancyReport && (
                <ul className="list-disc list-inside">
                  <li>
                    <DocumentLink data={page.vacancyReport} />
                  </li>
                </ul>
              )}
            </CardBody>
          </Card>
        </div>
        <BoardsList />
      </div>
    </>
  );
}
