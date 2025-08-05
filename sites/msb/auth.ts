import NextAuth from 'next-auth';
import MicrosoftEntraId from 'next-auth/providers/microsoft-entra-id';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    MicrosoftEntraId({
      authorization: {
        params: {
          scope: 'openid profile email offline_access',
        },
      },
    }),
  ],
});
