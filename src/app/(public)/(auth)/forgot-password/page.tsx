import { Metadata } from 'next';
import ForgotPassword from '../_components/forgot-page';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Forgot your password `,
    description: `Search and book the best flight deals with`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = () => <ForgotPassword />;

export default page;
