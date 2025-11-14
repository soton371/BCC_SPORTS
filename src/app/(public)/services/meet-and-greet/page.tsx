import { Metadata } from 'next';
import MeetAndGreetDetailsPage from './_component/MeetAndGreetDetailsPage';

export const metadata: Metadata = {
  title: 'Meet and Greet Service at Dhaka Airport | SOHI',
  description:
    'Book premium Meet and Greet service at Dhaka Airport. Fast-track immigration, baggage help, and a smooth travel experience.',
  keywords: [
    'Dhaka airport meet and greet',
    'airport assistance Bangladesh',
    'VIP airport service',
  ],
  openGraph: {
    title: 'Meet and Greet Service at Dhaka Airport | SOHI',
    description:
      'Premium Meet and Greet service at Shahjalal International Airport Dhaka. Book online with SOHI.',
    url: 'https://sohi.com.bd/meet-and-greet',
    siteName: '''',
    images: [
      {
        url: 'https://sohi.com.bd/og-meet-and-greet.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet and Greet Service at Dhaka Airport',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
const AirportMeetGreet = () => {
  return <MeetAndGreetDetailsPage />;
};

export default AirportMeetGreet;
