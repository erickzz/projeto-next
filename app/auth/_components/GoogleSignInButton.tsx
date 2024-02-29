import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function GoogleSignInButton() {
  const loginWithGoogle = () => {
    console.log('Attempting to sign in with Google');
    signIn('google', { callbackUrl: 'http://localhost:3000/' });
  };

  return (
    <Button onClick={loginWithGoogle} className="w-full" variant={'outline'}>
      Sign in with Google
    </Button>
  );
}
