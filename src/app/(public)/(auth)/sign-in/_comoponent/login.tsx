'use client';

import { FormInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import './login-page.css';
import CommLogo from '@/components/ui/CommLogo';
import { AlertTriangle } from 'lucide-react';
const loginSchema = z.object({
  user_or_email: z.string().nonempty({ message: 'Username and Email is required' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  console.log(searchParams, redirectUrl);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_or_email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILoginSchema) => {
    try {
      setIsLoading(true);

      const result = await signIn('credentials', {
        redirect: false,
        user_or_email: data.user_or_email,
        password: data.password,
      });

      console.log(result, '8888888888888888888888');

      if (result?.error) {
        // NextAuth gives "CredentialsSignin" if authorize() returns null
        let message = 'Login failed. Please try again.';

        if (result.error === 'CredentialsSignin') {
          message = 'Invalid username or password.';
        }

        setError(message);
        setIsLoading(false);
        return;
      }

      router.replace(redirectUrl || '/');
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const bgImages = ['/login/login1.jpg', '/login/login2.jpg', '/login/login3.jpg'];
  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-gradient-to-tr from-purple-50 via-indigo-100 to-white px-6 py-12'>
      <div className='flex flex-col md:flex-row bg-white/70 backdrop-blur-md shadow rounded-3xl max-w-6xl w-full overflow-hidden'>
        {/* Image Section with polygon clip and overlay */}
        <div className='hidden md:block md:w-1/2 relative'>
          {bgImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt='Background Slide'
              fill
              priority={i === 0}
              sizes='100vw'
              className={`object-cover absolute inset-0 slide bg-fade-${i + 1}`}
            />
          ))}

          <div className='absolute inset-0 bg-gradient-to-tr from-indigo-900/70 via-purple-800/50 to-transparent flex flex-col justify-center px-14'>
            <h1 className='text-white text-5xl font-extrabold mb-3 drop-shadow-lg leading-tight'>
              {/* write text here---- */}
            </h1>
            <p className='text-indigo-200 text-xl font-light max-w-xs drop-shadow-md'></p>
          </div>
        </div>

        {/* Form Section */}
        <div className='md:w-1/2 p-10 sm:p-16 flex flex-col justify-center'>
          <div className='max-w-md mx-auto w-full'>
            <div className='text-center mb-10 relative'>
              <h2 className={cn('text-3xl font-bold text-gray-900 font-sans mb-1')}>
                <div className='flex flex-col items-center justify-center text-center'>
                  <CommLogo width={134} />
                  <span className='mt-2 text-2xl font-semibold'>Sign in to your account</span>
                </div>
              </h2>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' noValidate>
                {/* Email input with floating label */}
                <FormInput<ILoginSchema>
                  name='user_or_email'
                  label='Email Address'
                  placeholder='Enter your Email'
                />

                {/* Password input with floating label */}
                <FormInput<ILoginSchema>
                  name='password'
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                />

                {/* Error message under inputs if any */}
                {error && (
                  <div className='flex items-center gap-2 text-red-600 font-semibold text-sm mt-3'>
                    <AlertTriangle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <Link
                    href='/forgot-password'
                    className='hover:text-indigo-700 font-semibold transition-colors'
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Button loading={isLoading} type='submit' className='w-full py-3'>
                  Log in
                </Button>
              </form>
            </FormProvider>

            <p className='mt-14 text-center text-gray-700 text-sm font-medium'>
              Not a member?{' '}
              <Link
                href='sing-up'
                className='text-primary-400 hover:text-primary-500 transition-colors font-semibold'
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-polygon {
          clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
