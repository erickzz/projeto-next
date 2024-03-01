'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Spinner from '@/components/Spinner';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  function submitHandler(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: 'http://localhost:3000',
    });
  }

  function submitHandlerProvider(provider: string) {
    setIsLoading(true);
    signIn(provider, { callbackUrl: 'http://localhost:3000' });
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/5 h-auto p-4">
        <div className="space-y-2 text-center mb-2">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to log in to your account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2 mt-4">
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => {
              submitHandlerProvider('google');
            }}
          >
            Sign in with Google
          </Button>
          <Button
            className="w-full bg-slate-700 text-white hover:bg-slate-800 transition-colors"
            onClick={() => {
              submitHandlerProvider('github');
            }}
          >
            Sign in with Github
          </Button>
          <div className="text-center text-sm">
            Don&apost have an account?
            <Link className="underline" href="/auth/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
