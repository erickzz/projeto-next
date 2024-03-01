'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="space-y-6 flex flex-col items-center justify-center">
          <Avatar>
            <AvatarImage src={session.user?.image ?? ''} />
            <AvatarFallback>
              {session.user?.name ? session.user.name[0] : ':)'}
            </AvatarFallback>
          </Avatar>
          <p>
            You have access.
            <span>{session.user?.email}</span>
          </p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center text-center">
      <div className="space-y-6">
        <p>Sign in to have access to the content</p>
        <Button onClick={() => router.push('/auth')}>Sign In</Button>
      </div>
    </div>
  );
}
