'use client';

import { FormInput, FormSelectInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { useSignUpAccountMutation } from '@/lib/APIs/common-api';
import { getRTKError } from '@/lib/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../sign-in/_comoponent/login-page.css';
import { useEffect } from 'react';
const signupSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  gender: z.string().nonempty({ message: 'Gender is required' }),
  phone_number: z.string().nonempty({ message: 'Phone number is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ISignupSchema = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [signUpAcc, { isLoading, error, isSuccess }] = useSignUpAccountMutation();

  const methods = useForm<ISignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      gender: 'Male',
      name: '',
      phone_number: '',
      password: '',
    },
  });

  const onSubmit = async (data: ISignupSchema) => {
    const { data: result } = await signUpAcc(data);

    const user = result?.data;

    console.log(user, '---------');
    // await signIn('credentials', {
    //   token: result?.token,
    //   id: user?.id,
    //   email: user?.email,
    //   name: user?.name,
    //   username: user?.username,
    //   gender: user?.gender,
    //   photo: '',
    //   redirect: true,
    //   redirectTo: '/',
    // });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/sign-in');
    }
  }, [isSuccess]);
  const bgImages = ['/login/login1.jpg', '/login/login2.jpg', '/login/login3.jpg'];
  return (
    <FormProvider {...methods}>
      <div className='min-h-[90vh] flex items-center justify-center bg-gradient-to-tr from-primary-50 via-primary-100 to-white px-6 py-12'>
        <div className='flex flex-col md:flex-row max-w-6xl w-full rounded-3xl shadow bg-white/70 backdrop-blur-md overflow-hidden'>
          {/* Image Section with polygon clip */}
          <div
            className='hidden md:block md:w-1/2 relative clip-polygon'
            style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}
          >
            {bgImages?.map((src, i) => (
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

            <div className='absolute inset-0 bg-black/30 z-10' />
            <div className='absolute inset-0 bg-gradient-to-tr from-primary-900/80 via-primary-800/60 to-transparent  flex flex-col justify-center px-14 z-20'>
              <motion.h1
                className='backdrop-blur-[3px] text-white text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl leading-tight'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                Welcome to <span className='text-primary-300'>Sohi</span>
              </motion.h1>

              <motion.p
                className='backdrop-blur-[3px] text-white/80 text-xl md:text-2xl font-light max-w-2xl drop-shadow-lg'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              >
                Streamlining airport services with{' '}
                <span className='font-semibold text-primary-200'>efficiency</span>,{' '}
                <span className='font-semibold text-primary-200'>care</span>, and{' '}
                <span className='font-semibold text-primary-200'>reliability</span>.
              </motion.p>

              <motion.div
                className='mt-8 flex gap-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link href={'/'}>
                  <button className='px-6 py-3 rounded-2xl bg-primary-600 text-white font-medium shadow-lg hover:bg-primary-500 hover:scale-105 transition'>
                    Get Started
                  </button>
                </Link>
                <Link href={'/about-us'}>
                  {' '}
                  <button className='px-6 py-3 rounded-2xl bg-white/10 text-white font-medium shadow-lg backdrop-blur hover:bg-white/20 hover:scale-105 transition'>
                    Learn More
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className='md:w-1/2 p-10 sm:p-16 flex flex-col justify-center'>
            <div className='max-w-md mx-auto w-full'>
              <div className='text-center mb-10 relative'>
                <h2 className='text-3xl font-bold text-gray-900 font-sans mb-1'>
                  Open a new account
                </h2>
                {error && (
                  <div className='flex items-center justify-center gap-2 mt-3 text-red-600 font-semibold text-sm'>
                    <AlertTriangle size={18} />
                    <span>{getRTKError(error)}</span>
                  </div>
                )}
              </div>

              <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-5' noValidate>
                <FormInput<ISignupSchema>
                  name='name'
                  label='Full Name'
                  placeholder='Enter your Full Name'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <FormInput<ISignupSchema>
                  name='email'
                  label='Email Address'
                  placeholder='you@example.com'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <FormInput<ISignupSchema>
                  name='password'
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <div className='flex gap-4'>
                  <FormSelectInput<ISignupSchema>
                    name='gender'
                    label='Gender'
                    placeholder='Select gender'
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                      { label: 'Other', value: 'Other' },
                    ]}
                    className='flex-1'
                  />
                  <FormInput<ISignupSchema>
                    name='phone_number'
                    label='Phone Number'
                    placeholder='Enter your phone number'
                    className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                  />
                </div>

                <Button
                  loading={isLoading}
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-primary via-secondary to-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/70 transition-all duration-400'
                >
                  Sign up
                </Button>
              </form>

              <p className='mt-14 text-center text-gray-700 text-sm font-medium'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='text-primary hover:text-primary-dark transition-colors font-semibold'
                >
                  Login here
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
    </FormProvider>
  );
}
