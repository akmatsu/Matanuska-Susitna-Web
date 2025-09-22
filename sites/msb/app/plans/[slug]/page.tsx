import { BasePage } from '@/components/static/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageSection } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { notFound, redirect } from 'next/navigation';
import { DropdownButton } from '../../../../../packages/ui/src/components';
import { PageListItem } from '@/components/static/Page/PageListItem';
import { PagesLinkList } from '@/components/static/Page/PagesLinkList';
import { getClientHandler } from '@/utils/apollo/utils';

const PlanQuery = gql(`
  query GetPlan($slug: String!, $now: DateTime!) {
    plan(where: { slug: $slug }) {
      ...BasePageInfo
      parent {
        ...PageItem
      }
      components {
        ...PageLinkList
      }
      currentDocument {
        label
        document {
          ...DocumentLink
        }
      }
      effort {
        url {
          url
        }
      }
      autoRedirectToExternalWebsite
      draftDocument {
        label
        document {
          ...DocumentLink
        }
      }
      pastDocuments {
        id
        label
        document {
          file {
            url
          }
          ...DocumentLink
        }
      }
    }
  }
`);

export default async function PlanPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClientHandler({
    query: PlanQuery,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching plan data:', errors || error);
    throw error;
  }

  const page = data.plan;

  if (!page) {
    console.error('Plan not found for slug:', slug);
    return notFound();
  }

  if (!!page.autoRedirectToExternalWebsite && page.effort?.url?.url)
    return redirect(page.effort.url.url);

  const useSideBar =
    page.currentDocument?.document ||
    !!page.pastDocuments?.length ||
    !!page.components?.length ||
    page.parent;

  return (
    <BasePage
      data={page}
      rightSide={
        useSideBar ? (
          <>
            {page.currentDocument?.document && (
              <PageSection title="Current Adopted Plan">
                <DocumentLinkButton data={page.currentDocument.document} block>
                  {page.currentDocument.label}
                </DocumentLinkButton>
              </PageSection>
            )}
            {page.draftDocument?.document && (
              <PageSection title="Draft Plan">
                <DocumentLinkButton data={page.draftDocument.document} block>
                  {page.draftDocument.label}
                </DocumentLinkButton>
              </PageSection>
            )}
            {!!page.pastDocuments?.length && (
              <PageSection title="Past Plans">
                {page.pastDocuments.length > 2 ? (
                  page.pastDocuments.map((doc) => (
                    <DocumentLinkButton key={doc.id} data={doc.document} block>
                      {doc.label}
                    </DocumentLinkButton>
                  ))
                ) : (
                  <DropdownButton
                    buttonProps={{
                      block: true,
                    }}
                    label="View Past Plans"
                    items={page.pastDocuments.map((doc) => ({
                      label: doc.label || '',
                      href: doc.document?.file?.url,
                      value: doc.id,
                    }))}
                  />
                )}
              </PageSection>
            )}
            {page.parent && (
              <PageSection title="Parent Plan">
                <PageListItem item={page.parent} title="plan" />
              </PageSection>
            )}

            <PagesLinkList data={page.components} title="Related Plans" />
          </>
        ) : undefined
      }
    />
  );
}
