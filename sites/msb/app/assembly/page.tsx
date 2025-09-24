import { BasePage } from '@/components/static/BasePage';
import { Link } from '@/components/static/Link';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import Image from 'next/image';

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
      pageBodyProps={{
        actionSlot: (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              {districts?.map((district) => (
                <Link
                  href={`/assembly-districts/${district.title}`}
                  className="not-prose flex flex-col items-center text-ink no-underline hover:bg-base-lightest rounded p-2 transition-colors group"
                  key={district.title}
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
