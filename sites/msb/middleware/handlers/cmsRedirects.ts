import { gql } from '@msb/js-sdk/gql';
import { getClient } from '../../utils/apollo/ApolloClient';
import { NextResponse } from 'next/server';
import { NextAuthRequest } from 'next-auth';

const query = gql(`
  query getRedirects($path: String!) {
    redirect(where: { from: $path }) {
      to {
        item {
          __typename
          ... on BasePageWithSlug {
            slug
          }
          ... on Url {
            url
          }
        }
      }
    }
  }
`);

export async function handleCmsRedirects(req: NextAuthRequest) {
  // If user is not an admin they will be redirected.
  if (!req.auth) {
    const { data } = await getClient().query({
      query,
      variables: {
        path: req.nextUrl.pathname,
      },
    });

    const redirectInfo = data.redirect;

    if (redirectInfo) {
      const redirectUrl =
        redirectInfo.to?.item?.__typename === 'Url'
          ? redirectInfo.to.item.url
          : redirectInfo.to?.item?.slug;

      if (redirectUrl) return NextResponse.redirect(redirectUrl);
    }
  }
}
