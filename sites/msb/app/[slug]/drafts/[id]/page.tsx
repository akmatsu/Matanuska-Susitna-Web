// import { BasePage } from '@/components/static/BasePage';
// import { PageListItems } from '@/components/static/Page';
// import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
// import { getClientHandler } from '@/utils/apollo/utils';
// import { gql } from '@msb/js-sdk/gql';
// import { notFound } from 'next/navigation';

// const query = gql(`
//   query GetTopicPageDraft($id: ID!, $now: DateTime!) {
//     topicDraft(where: { id: $id }) {
//       ...BasePageInfo
//       boards {
//         ...PageList
//       }
//       trails {
//         ...PageList
//       }
//       parks {
//         ...PageList
//       }
//       facilities(orderBy:  {
//          title: asc
//       }) {
//         ...FacilitiesList
//       }
//     }
//   }
// `);

// interface Props {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

export default async function page(props: PageProps<'/[slug]/drafts/[id]'>) {
  // const params = await props.params;
  // const { data } = await getClientHandler({
  //   query,
  //   variables: {
  //     id: params.id,
  //     now: new Date().toISOString(),
  //   },
  // });
  // const topic = data?.topicDraft;
  // if (!topic) return notFound();
  // return (
  //   <BasePage
  //     data={topic}
  //     rightSide={
  //       <>
  //         <PageFacilities facilities={topic.facilities} />
  //         <PageListItems items={topic.trails} title="Trails" />
  //         <PageListItems items={topic.parks} title="Parks" />
  //       </>
  //     }
  //   >
  //     <PageListItems items={topic.boards} title="Boards" />
  //   </BasePage>
  // );
}
