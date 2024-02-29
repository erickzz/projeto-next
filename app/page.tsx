import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  return (
    <main>
      <div>
        <h1>Home</h1>
        <p>Session: {JSON.stringify(session)}</p>
      </div>
    </main>
  );
}
