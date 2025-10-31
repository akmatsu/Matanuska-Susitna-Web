import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { Metadata } from 'next';
import { PageBody } from '@/components/static/Page/PageBody';
import { notFound } from 'next/navigation';
import { BoardsList } from './components/BoardsList';
import { gql } from '@msb/js-sdk/gql';
import { BoardDocuments } from '@/components/static/Page/BoardDocuments';
import Link from 'next/link';
import { CodeLink } from '@/components/static/CodeLink';
import { PhoneLink } from '@/components/static/PhoneLink';
import { DocumentLink } from '@/components/static/DocumentLink';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';
import { PageContainer } from '@/components/static/Page';
import { getClientHandler } from '@/utils/apollo/utils';

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

export const metadata: Metadata = {
  title: 'MSB - Boards & Commissions',
  description:
    'The Matanuska-Susitna Borough (MSB) Boards, Commissions, and Community Councils',
};

export default async function BoardsPage() {
  const { data, error } = await getClientHandler({
    query: getBoardsPage,
  });

  if (error) {
    console.error('Error fetching boards page data:', error);
    throw error;
  }

  if (!data?.boardPage) {
    return notFound();
  }

  const page = data.boardPage;

  return (
    <>
      <PageHeroImage page={page} />
      <PageContainer size="lg" breakPoint="sm">
        <div className="flex flex-col gap-8">
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
                  the Boards & Commissions Application. Completed applications
                  can be emailed to{' '}
                  <Link href="mailto:jamie.jokhy@matsugov.us">
                    jamie.jokhy@matsugov.us
                  </Link>
                  , delivered or mail to the Mat-Su Borough Clerk&apos;s Office,
                  350 E. Dahlia Ave, Palmer AK, 99645, or Faxed to 907-861-7845.
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
                  This report is pending Assembly confirmation. Please contact
                  the Mat-Su Borough Clerk&apos;s office for additional
                  information regarding the vacancy report. If you have
                  questions about the application process, please call the
                  Mat-Su Borough Clerk&apos;s office at{' '}
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
      </PageContainer>
    </>
  );
}
