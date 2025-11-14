import Register from '../_components/Register';
import SignUpPage from '../_components/sign-up-page';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Open a new account `,
    description: `Search and book the best flight deals with`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = () => <Register />;

export default page;
