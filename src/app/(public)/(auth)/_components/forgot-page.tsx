'use client';

import { FormInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import CommLogo from '@/components/ui/CommLogo';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useMatchOTPMutation, useSendOTPMutation } from '@/lib/APIs/common-api';
import { getRTKError } from '@/lib/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  otp: z.string().optional(),
});

export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const [sendOtp, { isLoading, isSuccess, error, data, isError }] = useSendOTPMutation();

  const [
    matchOtp,
    {
      isLoading: matchLoading,
      isSuccess: matchSuccess,
      isError: matchErr,
      error: matchErrs,
      data: matchData,
    },
  ] = useMatchOTPMutation();

  const methods = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = methods.watch('email');

  const onSubmit = async (data: IForgotPasswordSchema) => {
    if (data.email) return sendOtp({ email: data.email, type: 'reset_b2c' });
    if (data.otp) {
      await matchOtp({
        email: email,
        otp: data.otp,
        type: 'reset_b2c',
      });
    }
  };

  useEffect(() => {
    if (matchSuccess) {
      router.push(
        `/forgot-password/new-password?email=${matchData?.email}&token=${matchData?.token}`,
      );
    }
  }, [matchSuccess]);

  console.log(data, '---------------------------', error);
  return (
    <FormProvider {...methods}>
      <div className='min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8'>
        <div className='flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg'>
          {/* Image Section */}
          <div className='hidden md:block md:w-1/2 bg-blue-600 relative'>
            <Image
              src='/icon/forgotpass.jpg'
              alt='Login'
              className='absolute inset-0 h-full w-full object-cover'
              height={1280}
              width={1280}
            />
          </div>

          {/* Form Section */}
          <div className='w-full md:w-1/2 bg-background p-8 md:p-12 flex flex-col justify-center'>
            <div className='max-w-md w-full mx-auto'>
              <div className='text-center mb-8 relative'>
                <CommLogo className='mx-auto' />
                <h2 className='mt-6 text-2xl font-extrabold text-gray-900 font-sans'>
                  Forgot password ?
                </h2>
                {!isError && (
                  <p className='text-xs text-red-500 font-semibold left-0 right-0 -bottom-5'>
                    {getRTKError(error)}
                  </p>
                )}
                {isError && (
                  <p className='text-xs text-red-500 font-semibold left-0 right-0 -bottom-5'>
                    Try After {getRTKError(error)}s
                  </p>
                )}

                {isSuccess && (
                  <p className='text-xs absolute text-green-500 font-semibold left-0 right-0 -bottom-5'>
                    {`We've sent an OTP to your email — check your inbox to continue.`}
                  </p>
                )}
              </div>

              <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6 min-h-40'>
                <div>
                  <FormInput<IForgotPasswordSchema>
                    name={'email'}
                    label='Email'
                    placeholder='Provide your email'
                    disabled={isSuccess}
                  />
                </div>

                {isSuccess && (
                  <FormField
                    control={methods.control}
                    name='otp'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          One-Time Password
                          {matchErr && (
                            <p className='text-xs text-red-500 font-semibold left-0 right-0 -bottom-5'>
                              ({getRTKError(matchErrs)})
                            </p>
                          )}
                        </FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the one-time password sent to your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className='mt-5'>
                  <Button loading={isLoading || matchLoading} type='submit' className='w-full'>
                    {isSuccess ? 'Match OTP' : 'Send OTP to Email'}
                  </Button>
                </div>
              </form>

              <p className='mt-8 text-center text-sm text-gray-600'>
                Already have a account?{' '}
                <Link
                  href={`/sign-in`}
                  className='font-medium text-primary-600 hover:text-primary-500'
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
