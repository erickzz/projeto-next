'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div>You have access</div>
      </>
    );
  }

  return (
    <>
      <div>This is a protected route</div>
    </>
  );
}
