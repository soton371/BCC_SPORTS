import { Metadata } from 'next';
import VerifyPage from '../../_components/verify-page';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Verify your email `,
    description: `Search and book the best flight deals with`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = () => <VerifyPage />;

export default page;
