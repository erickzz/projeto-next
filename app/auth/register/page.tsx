'use client';

import Spinner from '@/components/Spinner';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(form.formState.isSubmitting);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setTimeout(() => {
        router.push('/auth');
      }, 3000);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-auto h-auto border-2 p-20 rounded-xl">
        <div className="space-y-2 text-center mb-2">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
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
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm">
            Already have an account?
            <Link className="underline" href="/auth">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
