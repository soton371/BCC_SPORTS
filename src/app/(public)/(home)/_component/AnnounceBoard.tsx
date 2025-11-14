import Image from 'next/image';
import React from 'react';

const AnnounceBoard = () => {
  return (
    <section className='py-16 relative text-center bg-cover bg-center px-4 sm:px-6 lg:px-0'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center -z-10'
        style={{
          backgroundImage: "url('/bccImages/announceBoard.png')",
          transform: 'rotate(180deg)',
        }}
      />

      {/* Heading */}
      <h2 className='text-4xl md:text-5xl font-bebas font-bold text-blue-950 flex justify-center items-center gap-3'>
        Announce Board
        <Image width={40} height={30} src='/bccImages/announce.png' alt='icon' />
      </h2>

      <p className='text-3xl  sm:text-3xl md:text-4xl font-bebas font-bold text-orange-500 mt-2'>
        Rules of BCC Fan’s Tournament - 2025
      </p>

      {/* Rules */}
      <div className='mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-5xl mx-auto text-left'>
        {[1, 2].map((col, idx) => (
          <div
            key={col}
            className={`space-y-3 sm:space-y-4 text-base sm:text-lg leading-6 sm:leading-7 ${
              idx === 0 ? 'md:border-r md:border-gray-500 md:pr-5' : 'md:pl-5'
            }`}
          >
            <p>
              একজন ফ্যান হিসেবে এই টুর্নামেন্টে রেজিস্ট্রেশন করতে আপনাকে যে নিয়ম গুলো মানতে হবে:
            </p>
            <ol className='list-decimal list-inside space-y-1 sm:space-y-2'>
              <li>আপনি প্রথম যে টিমে রেজিস্ট্রেশন করবেন সেটা চূড়ান্ত বলে গণ্য হবে।</li>
              <li>রেজিস্ট্রেশন ফি বাবদ ৫০ টাকা জমা দিতে হবে।</li>
              <li>রেজিস্ট্রেশনের পর অনুপস্থিত থাকলে কমিটিকে জানাতে হবে।</li>
              <li>শেষ তারিখ - ২৬/১১/২০২৩ রাতঃ ১১ঃ৫৯।</li>
              <li>কমিটির সিদ্ধান্ত মেনে নিতে হবে।</li>
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnounceBoard;
