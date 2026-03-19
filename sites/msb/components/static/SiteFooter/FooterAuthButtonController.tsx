import { auth, signIn, signOut } from '@/auth';
import { FooterAuthButtons } from './FooterAuthButtons';

export async function FooterAuthButtonController() {
  const a = await auth();
  const user = a?.user;

  return (
    <FooterAuthButtons
      action={async () => {
        'use server';
        return user ? signOut() : signIn();
      }}
    >
      {user ? 'Logout' : 'Login'}
    </FooterAuthButtons>
  );
}
