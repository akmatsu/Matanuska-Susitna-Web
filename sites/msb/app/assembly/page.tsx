import { BasePage } from '@/components/static/BasePage';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import Image from 'next/image';

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
      directory {
        ...DocumentLink
      }
      
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

  return (
    <BasePage
      data={page}
      mapSlot={
        page?.directory && (
          <DocumentLinkButton data={page.directory} block color="primary" />
        )
      }
      pageBodyProps={{
        actionSlot: (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              {districts?.map((district) => (
                <Link
                  href={`/assembly-districts/${district.slug}`}
                  className="not-prose flex flex-col items-center text-ink no-underline hover:bg-base-lightest rounded p-2 transition-colors group"
                  key={district.slug}
                >
                  <Image
                    src={district.photo?.file?.url || ''}
                    alt={district.memberName || 'district member photo'}
                    className="rounded-full"
                    width={100}
                    height={100}
                  />
                  <p className="text-lg font-semibold text-primary group-hover:text-primary-dark transitions-colors">
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
