import { auth } from '@/auth';
import Unauthorized from '@/components/unauthorized';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Mange your account`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const layout = async ({ children }: Props) => {
  const data = await auth();

  if (data?.user.email) return children;

  return <Unauthorized />;
};

export default layout;
