'use server';

import { signIn } from '@/auth';
import { CredentialsSignin } from 'next-auth';

const userLogin = async (data: any, callback?: string) => {
  try {
    await signIn('credentials', {
      user_or_email: data.user_or_email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
};

export { userLogin };
