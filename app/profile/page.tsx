import { prisma } from '@/services/database';
import { getServerSession } from 'next-auth';

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

export default async function ProfilePage() {
  const session = await getServerSession();
  console.log(session);
  // const user = await getUser('clteiveik0003o33lkm05myrq');
  return (
    <div>
      <h1>Profile</h1>
      {/* <p>{user?.name}</p> */}
    </div>
  );
}
