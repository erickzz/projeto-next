import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function GithubSignInButton() {
  const loginWithGithub = () => {
    console.log('Attempting to sign in with Github');
    signIn('github', { callbackUrl: 'http://localhost:3000/' });
  };

  return (
    <Button onClick={loginWithGithub} className="w-full" variant={'outline'}>
      Sign in with Github
    </Button>
  );
}
