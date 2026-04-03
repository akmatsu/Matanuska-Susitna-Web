import { BasePage } from '@/components/static/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const metaQuery = gql(`
  query GetAssemblyPageMeta {
    board(where: { title: "Assembly" }) {
      title
      description
    }
  }
`);

export async function generateMetadata() {
  try {
    const { data } = await getClientHandler({
      query: metaQuery,
    });
    return {
      title: `MSB - ${data?.board?.title || 'Assembly'}`,
      description: data?.board?.description,
    };
  } catch (error: any) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    if (error.networkError?.result?.errors) {
      console.error(
        'Network error: ',
        JSON.stringify(error.networkError.result.errors, null, 2),
      );
    }

    throw error;
  }
}

const GetAssemblyDistricts = gql(`
  query GetAssemblyDistricts($now: DateTime!) {
    assemblyDistricts(orderBy:  {
        title: asc
    }) {
      
      title
      slug
      memberName
      photo {
        file {
          url
        }
      }
      bio
    }

    board(
      where: { title: "Assembly" }
    ) {
      ...BasePageInfo
      slug
      directory {
        ...DocumentLink
      }
      directoryExcel 
    }
  }
`);

export default async function AssemblyPage() {
  const { data } = await getClientHandler({
    query: GetAssemblyDistricts,
    variables: { now: new Date().toISOString() },
  });

  const page = data?.board;
  const districts = data?.assemblyDistricts;

  if (!page) return notFound();

  return (
    <BasePage
      data={page}
      mapSlot={
        page.directoryExcel ? (
          <LinkButton
            href={`/boards/${page.slug}/directory`}
            block
            color="primary"
          />
        ) : (
          page.directory && (
            <DocumentLinkButton data={page.directory} block color="primary" />
          )
        )
      }
      pageBodyProps={{
        actionSlot: (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {districts?.map((district) => (
                <Link
                  href={`/assembly-districts/${district.slug}`}
                  className="not-prose text-ink hover:bg-base-lightest group flex flex-col items-center rounded p-2 no-underline transition-colors"
                  key={district.slug}
                >
                  <Image
                    src={district.photo?.file?.url || ''}
                    alt={district.memberName || 'district member photo'}
                    className="rounded-full"
                    width={100}
                    height={100}
                  />
                  <p className="text-primary group-hover:text-primary-dark transitions-colors text-lg font-semibold">
                    {district.memberName}
                  </p>
                  <p>{district.title}</p>
                </Link>
              ))}
            </div>
          </div>
        ),
      }}
    />
  );
}
