import BCCHeader from '@/components/header/BCCHeader';
import type { Metadata } from 'next';
import Image from 'next/image';
import AnnounceBoard from './_component/AnnounceBoard';

export const metadata: Metadata = {
  title: {
    default: 'Bangladesh',
    template: '%s',
  },
  description:
    'SOHI provides premium airport services in Bangladesh, including Meet & Assist, Lounge booking, and Luggage Wrapping at Dhaka Airport.',
  keywords: [
    'Dhaka airport services',
    'meet and greet Dhaka',
    'airport lounge Dhaka',
    'luggage wrapping Dhaka',
  ],
  openGraph: {
    title: 'Bangladesh',
    description:
      'Premium airport services in Dhaka: Meet & Assist, Lounge booking, and Luggage Wrapping.',
    url: 'https://sohi.com.bd',
    siteName: 'SOHI Bangladesh',
    images: [
      {
        url: 'https://sohi.com.bd/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Bangladesh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col'>
      {/* 🌟 Hero Section */}
      <section
        style={{ backgroundImage: "url('/bccImages/bg.jpg')" }}
        className='relative w-full bg-cover bg-center h-[800px]'
      >
        <div className='relative z-20 container'>
          <BCCHeader />
        </div>
        {/* Overlay */}
        <div className='absolute inset-0 bg-black/10 z-10'></div>

        {/* Content */}
        <div className='relative z-10 container mx-auto px-5 py-20 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between text-white gap-10'>
          {/* Left Text */}
          <div className='w-full text-center md:text-left space-y-6'>
            <div className='text-4xl w-full sm:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-wide text-[#E1E100] leading-tight'>
              <div className='flex items-baseline justify-start'>
                <Image
                  src='/bccImages/Rectangle.svg'
                  width={50}
                  height={60}
                  alt='Tournament Cup'
                  className='mr-3'
                />
                BCC Fan’s
              </div>
              Tournament - 2025
            </div>

            <p className='text-lg sm:text-2xl text-neutral-100 leading-relaxed'>
              arranged by - BCC Borogangdia Cricket Club
            </p>

            <div className='flex flex-wrap justify-center md:justify-start gap-4'>
              <button className='px-6 py-3 bg-[#E1E100] text-blue-950 font-semibold rounded-lg hover:bg-yellow-300 transition'>
                Register Now
              </button>
              <button className='px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition'>
                Visit Facebook Page
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className='relative w-full md:w-1/2 flex justify-center'>
            <div className='relative w-[250px] sm:w-[300px] lg:w-[400px] flex flex-col items-center'>
              {/* Cup Image */}
              <Image
                src='/bccImages/cup.png'
                alt='Tournament Cup'
                width={400}
                height={400}
                className='w-full relative z-10'
                priority
              />

              {/* Circle Image (attached under the cup) */}
              <Image
                src='/bccImages/circle.png'
                alt='Decorative Circle'
                width={400}
                height={400}
                className='w-[200px] sm:w-[250px] lg:w-[300px] -mt-8 -z-10 opacity-90'
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📢 Announce Board */}
      <AnnounceBoard />

      {/* 🏏 Member List */}
      {/* <section className='py-20 bg-neutral-50'>
        <div className='container mx-auto text-center space-y-8'>
          <div>
            <h2 className='text-6xl font-bebas text-blue-950'>BCC Member List</h2>
            <p className='text-lg text-gray-600'>
              Talented athletes dedicated to cricket excellence
            </p>
          </div>

          <div className='flex justify-center gap-8 border-b pb-4'>
            {['All Player', 'Cricket', 'Football', 'Badminton'].map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 font-onest ${
                  i === 0 ? 'border-b-4 border-orange-500 text-orange-500' : 'text-blue-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10'>
            {[...Array(12)].map((_, i) => (
              <div key={i} className='relative rounded-lg overflow-hidden'>
                <img
                  src='https://placehold.co/300x400'
                  alt='player'
                  className='w-full h-full object-cover'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white'>
                  <h4 className='font-semibold'>Istiak Turjo</h4>
                  <p className='text-sm'>Wicket Keeper</p>
                </div>
              </div>
            ))}
          </div>
          <button className='px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400'>
            View All
          </button>
        </div>
      </section> */}

      {/* 🖼 Gallery */}
      {/* <section className='py-20 bg-orange-50 text-center'>
        <div className='container mx-auto space-y-10'>
          <h2 className='text-6xl font-bebas text-blue-950'>BCC Photo Gallery</h2>
          <p className='text-lg text-gray-700'>
            Photo gallery of BCC. We are together, We are rivals, We are power.
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='relative rounded-lg overflow-hidden bg-gradient-to-b from-black/0 to-black/40'
              >
                <img
                  src={`https://placehold.co/400x400?text=Photo+${i + 1}`}
                  alt={`Gallery ${i + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>

          <button className='px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400'>
            View All
          </button>
        </div>
      </section> */}

      {/* ⚡ Powerhouse */}
      {/* <section className='py-20 bg-blue-950 text-center text-white'>
        <div className='container mx-auto space-y-6'>
          <h2 className='text-6xl font-bebas text-orange-500'>Power House of BCC</h2>
          <p className='text-lg max-w-2xl mx-auto'>
            This is the power house of BCC. They are always ready for BCC. Power - Unity - Victory
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 justify-center'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='rounded-lg overflow-hidden bg-neutral-700'>
                <img
                  src='https://placehold.co/300x300'
                  alt='powerhouse'
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
