'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();

  // Check if the user is authenticated or in the process of authentication
  const loadingSession = status === 'loading';

  const router = useRouter();

  console.log(session?.user?.id);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center mr-4">
      <Link className="flex items-center justify-center text-bla" href="/">
        Next App
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border-salte-500 border-2">
                <AvatarImage src={session.user?.image ?? ''} />
                <AvatarFallback>
                  {session.user?.name ? session.user.name[0] : ':)'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${session.user?.name}`);
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth" className="mr-4">
            <Button>Sign In</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
